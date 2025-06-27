import type { APIResponse } from "../App";

export default function GoogleMap({ apiResponse }: { apiResponse: APIResponse }) {
  const lat = apiResponse.forCoordinates[0];
  const lon = apiResponse.forCoordinates[1];
  const url = `https://www.google.com/maps?q=${lat},${lon}&z=14&output=embed`
  return (
    <iframe
      src={url}
      width="100%"
      height="100%"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}