import { API_URL } from "./settings";

export async function getTemperature(pages = 1440) {
  const response = await fetch(`${API_URL}/temp/?pages=${pages}`);
  const data = await response.json();
  return data;
}