import "./index.css";
import { useState, useEffect } from "react";
import Heading from "./components/heading";
import { getNearbyPlaces } from "./services/api";
import type { Feature } from "geojson";
import Category from "./components/category";
import Footer from "./components/footer";

export interface APIResponse {
  forCoordinates: number[];
  requestedBy: string;
  POIbyCategory: {
    supermarket: Feature[];
    pharmacy: Feature[];
    restaurant: Feature[];
    fastfood: Feature[];
    hotel: Feature[];
  };
}

function App() {
  const [apiResponse, setApiResponse] = useState<APIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationRequested, setLocationRequested] = useState(false);

  // get user coordinates
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // get info from backend
          const response = await getNearbyPlaces(latitude, longitude);
          // display poi data
          setApiResponse(response);
          console.log(response);
          // clear any previous errors
          setError(null);
          // stop loading
          setIsLoading(false);
        } catch {
          setError("Failed to fetch nearby places");
          setIsLoading(false);
        }
      },
      () => {
        setError("Failed to get location");
        setIsLoading(false);
      }
    );
  };

  // request coordinates when component is rendered first time
  useEffect(() => {
    if (!locationRequested) {
      setLocationRequested(true);
      getLocation();
    }
  }, [locationRequested]);

  return (
    <>
      <Heading apiResponse={apiResponse} isLoading={isLoading} error={error} />

      <div className="flex flex-col items-center justify-center">
        {apiResponse?.POIbyCategory == null ? (
          <div className="text-center text-2xl font-bold h-64 flex items-center justify-center">
            Waiting for response
          </div>
        ) : (
          <>
            <div className="bg-orange-300/40 text-center text-orange-900 text-sm px-4 py-3 mt-8 rounded-lg">
              💡 Click on the arrow to expand category
            </div>
            {Object.keys(apiResponse.POIbyCategory).map((category) => {
              const categoryKey =
                category as keyof typeof apiResponse.POIbyCategory;
              const featureCollection = {
                type: "FeatureCollection" as const,
                features: apiResponse.POIbyCategory[categoryKey],
              };
              return (
                <Category
                  key={category}
                  featureCollection={featureCollection}
                  categoryName={category}
                />
              );
            })}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
