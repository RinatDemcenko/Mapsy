import { useState } from "react";

//{"type":"Feature","properties":{"name":"Milk-Agro","country":"Slovakia","country_code":"sk","region":"Eastern Slovakia","state":"Region of Košice","city":"Košice","postcode":"040 12","district":"District of Košice IV","neighbourhood":"Jazero","suburb":"Košice - mestská časť Nad Jazerom","street":"Spišské námestie","housenumber":"2365/2","iso3166_2":"SK-KI","lon":21.2833992,"lat":48.6897058,"formatted":"Milk-Agro, Spišské námestie 2365/2, 040 12 Košice, Slovakia","address_line1":"Milk-Agro","address_line2":"Spišské námestie 2365/2, 040 12 Košice, Slovakia","categories":["commercial","commercial.supermarket","wheelchair","wheelchair.yes","supermarket"],"details":["details","details.commercial","details.contact","details.facilities","details.payment"],"datasource":{"sourcename":"openstreetmap","attribution":"© OpenStreetMap contributors","license":"Open Database License","url":"https://www.openstreetmap.org/copyright","raw":{"name":"Milk-Agro","shop":"supermarket","brand":"Milk-Agro","email":"predajna204@milkagro.sk","level":0,"phone":"+421 907 715 031","osm_id":6262122696,"website":"https://www.milkagro.sk/","operator":"MILK-AGRO, spol. s r.o.","osm_type":"n","wheelchair":"yes","currency:EUR":"yes","payment:cash":"yes","opening_hours":"Mo-Fr 06:00-19:00; Sa 06:00-12:00","payment:coins":"yes","brand:wikidata":"Q64173785","payment:debit_cards":"yes","payment:credit_cards":"yes"}},"website":"https://www.milkagro.sk/","opening_hours":"Mo-Fr 06:00-19:00; Sa 06:00-12:00","brand":"Milk-Agro","brand_details":{"wikidata":"Q64173785"},"operator":"MILK-AGRO, spol. s r.o.","contact":{"phone":"+421 907 715 031","email":"predajna204@milkagro.sk"},"facilities":{"wheelchair":true},"payment_options":{"cash":true,"coins":true,"debit_cards":true,"credit_cards":true},"commercial":{"type":"supermarket","level":0},"distance":85,"place_id":"516bb697d98c483540596fef964748584840f00103f901c8684075010000009203094d696c6b2d4167726f"},"geometry":{"type":"Point","coordinates":[21.2833992,48.68970579976928]}}

export interface POI {
  type: "Feature";
  properties: {
    opening_hours: string;
    address_line1: string;
    address_line2: string;
    categories: string[];
    distance: number;
    website?: string;
    operator?: string;
    brand?: string;
    contact?: {
      phone?: string;
      email?: string;
    };
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

export interface CategoryColors {
  primary: string;
  secondary: string;
  light: string;
  text: string;
}

export default function POI({
  poi,
  categoryColors = {
    primary: "#ff8904",
    secondary: "#e67300",
    light: "#fff3e0",
    text: "#e67300",
  },
}: {
  poi: POI;
  categoryColors?: CategoryColors;
}) {
  const [showModal, setShowModal] = useState(false);

  const {
    opening_hours,
    address_line1,
    address_line2,
    categories,
    distance,
    website,
    operator,
    brand,
    contact,
  } = poi.properties;
  const { coordinates } = poi.geometry;

  const imageUrl = `/${categories[categories.length - 1]}.png`;

  // Links for navigation
  const navigateUrl = `https://www.google.com/maps?q=${coordinates[1]},${coordinates[0]}`;
  const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${coordinates[1]},${coordinates[0]}`;

  // Format distance
  const formatDistance = (dist: number): string => {
    if (dist < 1000) {
      return `${Math.round(dist)} m`;
    }
    return `${(dist / 1000).toFixed(1)} km`;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] w-full max-w-sm">
        {/* Image */}
        <div
          className="relative h-48 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${categoryColors.light}, ${categoryColors.light}f0)`,
          }}
        >
          <a
            href={navigateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full"
          >
            <img
              src={imageUrl}
              alt={categories[categories.length - 1] || "POI"}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </a>
        </div>

        {/* Card content */}
        <div className="p-4 space-y-3">
          {/* Addresses */}
          <h3 className="text-lg font-semibold text-gray-800 leading-tight">
            {address_line1}
          </h3>

          <p className="text-xs text-gray-500 leading-relaxed">
            {address_line2}
          </p>

          {/* Opening hours and distance */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                style={{ color: categoryColors.text }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {opening_hours || "Hours not specified"}
            </span>
            {/* some icons from claude to not deal with annoying licensing shit */}
            <span
              className="font-medium flex items-center"
              style={{ color: categoryColors.text }}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {formatDistance(distance)}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-2 pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="w-full text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
              style={
                {
                  backgroundColor: categoryColors.primary,
                  "--hover-color": categoryColors.secondary,
                } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  categoryColors.secondary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = categoryColors.primary;
              }}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Show Details
            </button>

            <div className="flex space-x-2">
              <a
                href={navigateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white border-2 font-medium py-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-sm"
                style={{
                  borderColor: categoryColors.primary,
                  color: categoryColors.text,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = categoryColors.light;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Navigate
              </a>

              <a
                href={streetViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white border-2 font-medium py-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-sm"
                style={{
                  borderColor: categoryColors.primary,
                  color: categoryColors.text,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = categoryColors.light;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                Street View
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Details modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-200"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  POI Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                {brand && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Brand:</span>
                    <span className="ml-2 text-gray-600">{brand}</span>
                  </div>
                )}

                {operator && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Operator:</span>
                    <span className="ml-2 text-gray-600">{operator}</span>
                  </div>
                )}

                {contact?.phone && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Phone:</span>
                    <a
                      href={`tel:${contact.phone}`}
                      className="ml-2 hover:opacity-80 transition-colors"
                      style={{ color: categoryColors.text }}
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}

                {contact?.email && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Email:</span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="ml-2 hover:opacity-80 transition-colors"
                      style={{ color: categoryColors.text }}
                    >
                      {contact.email}
                    </a>
                  </div>
                )}

                {website && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Website:</span>
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 hover:opacity-80 transition-colors"
                      style={{ color: categoryColors.text }}
                    >
                      {website}
                    </a>
                  </div>
                )}

                <div className="text-sm">
                  <span className="font-medium text-gray-700">
                    Coordinates:
                  </span>
                  <span className="ml-2 text-gray-600 font-mono">
                    {coordinates[1].toFixed(6)}, {coordinates[0].toFixed(6)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/*
poi data example:
type	"Feature"
properties	
name	"Продукти"
country	"Ukraine"
country_code	"ua"
state	"Cherkasy Oblast"
city	"Ostrivets"
municipality	"Бабанська селищна громада"
postcode	"20363"
district	"Uman Raion"
street	"вулиця Дружби"
iso3166_2	"UA-71"
lon	30.5194487
lat	48.5969951
formatted	"Продукти, вулиця Дружби, Uman Raion, Ostrivets, 20363, Ukraine"
address_line1	"Продукти"
address_line2	"вулиця Дружби, Uman Raion, Ostrivets, 20363, Ukraine"
categories	
0	"commercial"
1	"commercial.supermarket"
2	"supermarket"
details	
0	"details"
datasource	
sourcename	"openstreetmap"
attribution	"© OpenStreetMap contributors"
license	"Open Database License"
url	"https://www.openstreetmap.org/copyright"
raw	
name	"Продукти"
shop	"general"
osm_id	11035125505
name:uk	"Продукти"
osm_type	"n"
name_international	
uk	"Продукти"
commercial	
type	"general"
distance	2770
place_id	"5121730a97fa843e40596ebdde556a4c4840f00103f90101a7be9102000000920310d09fd180d0bed0b4d183d0bad182d0b8"
geometry	{ type: "Point", coordinates: (2)[…] }
*/
