import { useState } from "react";
import type { FeatureCollection } from "geojson";
import POI, { type POI as POIType } from "./poi";

const getCategoryGradient = (categoryName: string) => {
  switch (categoryName) {
    case "supermarket":
      return "from-[#1447e6] to-[#0d3cc7]";
    case "pharmacy":
      return "from-[#00d492] to-[#00a673]";
    case "restaurant":
      return "from-[#ec5949] to-[#d44439]";
    case "fastfood":
      return "from-[#ff8904] to-[#e67300]";
    case "hotel":
      return "from-[#00d3f2] to-[#00b8d4]";
    default:
      return "from-gray-500 to-gray-600";
  }
};

// getting colors for category
export const getCategoryColors = (categoryName: string) => {
  switch (categoryName) {
    case "supermarket":
      return {
        primary: "#1447e6",
        secondary: "#0d3cc7",
        light: "#e3f2fd",
        text: "#1447e6",
      };
    case "pharmacy":
      return {
        primary: "#00d492",
        secondary: "#00a673",
        light: "#e8f5e8",
        text: "#00a673",
      };
    case "restaurant":
      return {
        primary: "#ec5949",
        secondary: "#d44439",
        light: "#ffebee",
        text: "#d44439",
      };
    case "fastfood":
      return {
        primary: "#ff8904",
        secondary: "#e67300",
        light: "#fff3e0",
        text: "#e67300",
      };
    case "hotel":
      return {
        primary: "#00d3f2",
        secondary: "#00b8d4",
        light: "#e0f7fa",
        text: "#00b8d4",
      };
    default:
      return {
        primary: "#ff8904",
        secondary: "#e67300",
        light: "#fff3e0",
        text: "#e67300",
      };
  }
};

export default function Category({
  featureCollection,
  categoryName,
}: {
  featureCollection: FeatureCollection;
  categoryName: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { features } = featureCollection;

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div
      className="mt-8 w-[90%] px-6 pt-6 rounded-2xl"
      style={{ backgroundColor: getCategoryColors(categoryName).light }}
    >
      {/* Category Header with Toggle Button */}
      <div className="relative mb-6">
        <div
          className={`bg-gradient-to-r ${getCategoryGradient(
            categoryName
          )} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={`/${categoryName}_cat.svg`}
                alt={categoryName}
                className="w-10 h-10 object-contain brightness-0 invert"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div>
                <h2 className="text-2xl font-bold text-white capitalize tracking-wide">
                  {categoryName}
                </h2>
                <p className="text-white/80 text-sm font-medium">
                  {features.length} {features.length === 1 ? "place" : "places"}{" "}
                  found
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-xl text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* POI Grid*/}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded
            ? "max-h-[5000px] opacity-100 transform translate-y-0"
            : "max-h-0 opacity-0 transform -translate-y-4"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4 justify-items-center">
          {features.map((feature, index) => (
            <div
              key={feature.properties?.place_id || index}
              className={`transform transition-all duration-300 ${
                isExpanded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: isExpanded ? `${index * 50}ms` : "0ms",
              }}
            >
              <POI
                poi={feature as POIType}
                categoryColors={getCategoryColors(categoryName)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
