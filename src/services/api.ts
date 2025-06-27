const apiUrl = window.location.href.includes("localhost")
  ? "http://localhost:3000"
  : "https://mapsy-theta.vercel.app";


export async function getNearbyPlaces(lat: number, lon: number) {
  const response = await fetch(`${apiUrl}/nearby-places?lat=${lat}&lon=${lon}`);
  const data = await response.json();
  return data;
}