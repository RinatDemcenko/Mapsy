import { useState, useMemo } from "react";
import MapboxMap from "./mapboxMap";
import GoogleMap from "./googleMap";
import type { APIResponse } from "../App";

interface HeadingProps {
  apiResponse: APIResponse | null;
  isLoading: boolean;
  error: string | null;
}

export default function Heading({
  apiResponse,
  isLoading,
  error,
}: HeadingProps) {
  const [initialMessage] = useState(
    "Allow access to your location to get started"
  );
  const [showMapbox, setShowMapbox] = useState(false);

  // count total POI
  const totalPOI = useMemo(() => {
    if (!apiResponse) return 0;

    return Object.values(apiResponse.POIbyCategory).reduce(
      (total, category) => total + category.length,
      0
    );
  }, [apiResponse]);

  // message
  const message = useMemo(() => {
    if (isLoading) return "Getting your location...";
    if (error) return "Failed to get your location";
    if (apiResponse)
      return `${totalPOI} Points of interest found. Scroll down to see more!`;
    return initialMessage;
  }, [isLoading, error, apiResponse, totalPOI, initialMessage]);

  const categoryColors = [
    { name: "Supermarket", color: "#1447e6" },
    { name: "Pharmacy", color: "#00d492" },
    { name: "Restaurant", color: "#ec5949" },
    { name: "Fast Food", color: "#ff8904" },
    { name: "Hotel", color: "#00d3f2" },
    { name: "Your Location", color: "#fbac94" },
  ];

  return (
    <div className="min-h-160 w-full bg-gradient-to-br border-b-4 border-orange-300 from-gray-50 to-gray-200 flex flex-col lg:flex-row lg:min-h-screen">
      <img
        src="/mapsy_logo.png"
        alt="logo"
        className="hidden lg:block w-30 h-30 absolute top-4 left-4 lg:top-10 lg:left-10 z-10"
      />
      {/* heading */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 lg:px-16 lg:py-12">
        <div className="max-w-lg w-full">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-orange-300 mb-4">
            {message}
          </h2>
          <div className="bg-gray-200 rounded-lg p-3 sm:p-4">
            <p className="text-gray-600 text-sm sm:text-base lg:text-base leading-relaxed">
              {isLoading
                ? "Your location is being determined..."
                : "If your location is 111m or less from one of the locations already searched for, you will see the data for that location."}
            </p>
            {apiResponse && !showMapbox && (
              <button
                onClick={() => setShowMapbox(true)}
                className="mt-3 px-3 py-2 sm:px-4 sm:py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 w-full sm:w-auto"
              >
                Show results on a map
              </button>
            )}
          </div>

          {/* Color legend - only show when mapbox is active */}
          {apiResponse && showMapbox && (
            <div className="mt-4 bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">
                Click on a point to open it on Google Maps
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {categoryColors.map((category) => (
                  <div key={category.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full border border-white flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-xs text-gray-600">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* map */}
      <div className="flex-1 flex items-center justify-center px-4 lg:p-12">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-none lg:w-[85%] h-64 sm:h-50 lg:h-[65%] lg:min-w-[500px] lg:min-h-[300px] bg-white rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {apiResponse ? (
            showMapbox ? (
              <MapboxMap apiResponse={apiResponse} />
            ) : (
              <GoogleMap apiResponse={apiResponse} />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin size-5 rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-red-400 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Loading map...
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <p className="text-sm sm:text-base">
                    Map will appear after location access
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
