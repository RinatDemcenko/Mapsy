export default function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 lg:mt-20 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
          Project was developed using{" "}
          <a
            href="https://mapbox.com"
            className="text-orange-500 hover:text-orange-600 transition-colors duration-200 underline decoration-1 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mapbox
          </a>
          ,{" "}
          <a
            href="https://geoapify.com/places-api"
            className="text-orange-500 hover:text-orange-600 transition-colors duration-200 underline decoration-1 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Geoapify Places API
          </a>{" "}
          and{" "}
          <a
            href="https://www.google.com/maps"
            className="text-orange-500 hover:text-orange-600 transition-colors duration-200 underline decoration-1 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps.
          </a>
          {" "}Author:{" "}
          <a
            href="https://github.com/RinatDemcenko"
            className="text-orange-500 hover:text-orange-600 transition-colors duration-200 underline decoration-1 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rinat Demchenko
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
