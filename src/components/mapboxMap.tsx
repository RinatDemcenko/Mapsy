import Map, { Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Feature, GeoJSON } from "geojson";
import { useMemo } from "react";
import type { APIResponse } from "../App";

export default function MapboxMap({
  apiResponse,
}: {
  apiResponse: APIResponse;
}) {
  // variables for radius of the circle
  const deltaLat = useMemo(
    () =>
      25 / (111 * Math.cos((apiResponse.forCoordinates[0] * Math.PI) / 180)),
    [apiResponse]
  );
  const deltaLon = useMemo(() => 25 / 111, []);

  // geojson data
  const geojsonData = useMemo(
    () => convertToGeoJSON(apiResponse),
    [apiResponse]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMapClick = (event: { target: any; point: any }) => {
    const features = event.target.queryRenderedFeatures(event.point, {
      layers: ["point-layer"],
    });

    if (features.length > 0) {
      const feature = features[0];
      const coordinates = feature.geometry.coordinates;
      const [longitude, latitude] = coordinates;

      // open Google Maps on click
      const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  // map
  return (
    <Map
      initialViewState={{
        longitude: apiResponse.forCoordinates[1],
        latitude: apiResponse.forCoordinates[0],
        zoom: 14,
      }}
      maxBounds={[
        [
          apiResponse.forCoordinates[1] - deltaLon,
          apiResponse.forCoordinates[0] - deltaLat,
        ],
        [
          apiResponse.forCoordinates[1] + deltaLon,
          apiResponse.forCoordinates[0] + deltaLat,
        ],
      ]}
      maxZoom={16}
      minZoom={10}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      reuseMaps={true}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      onClick={handleMapClick}
      interactiveLayerIds={["point-layer"]}
    >
      <Source id="my-data" type="geojson" data={geojsonData}>
        <Layer
          id="point-layer"
          type="circle"
          paint={{
            "circle-radius": [
              "case",
              ["in", "HomeLocation", ["get", "categories"]],
              12,
              8,
            ],
            "circle-color": [
              "case",
              ["in", "supermarket", ["get", "categories"]],
              "#1447e6",
              ["in", "marketplace", ["get", "categories"]],
              "#f48fb1",
              ["in", "pharmacy", ["get", "categories"]],
              "#00d492",
              ["in", "restaurant", ["get", "categories"]],
              "#ec5949",
              ["in", "fastfood", ["get", "categories"]],
              "#ff8904",
              ["in", "hotel", ["get", "categories"]],
              "#00d3f2",
              ["in", "HomeLocation", ["get", "categories"]],
              "#fbac94",
              "#ffffff",
            ],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff",
          }}
        />
      </Source>
    </Map>
  );
}

const convertToGeoJSON = (apiResponse: APIResponse): GeoJSON => {
  // combine all categories
  const allFeatures: Feature[] = [
    ...(apiResponse.POIbyCategory.supermarket ?? []),
    ...(apiResponse.POIbyCategory.marketplace ?? []),
    ...(apiResponse.POIbyCategory.pharmacy ?? []),
    ...(apiResponse.POIbyCategory.restaurant ?? []),
    ...(apiResponse.POIbyCategory.fastfood ?? []),
    ...(apiResponse.POIbyCategory.hotel ?? []),
  ];
  allFeatures.push({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        apiResponse.forCoordinates[1],
        apiResponse.forCoordinates[0],
      ],
    },
    properties: {
      categories: ["HomeLocation"],
    },
  });

  return {
    type: "FeatureCollection",
    features: allFeatures,
  };
};
