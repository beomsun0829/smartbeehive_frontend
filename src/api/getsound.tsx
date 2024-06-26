import { API_URL } from "./settings";

export async function getSound(pages = 1440) {
  const response = await fetch(`${API_URL}/sound/?pages=${pages}`);
  const data = await response.json();
  return data;
}