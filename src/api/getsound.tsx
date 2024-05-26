import { API_URL } from "./settings";

export async function getSound() {
  const response = await fetch(`${API_URL}/sound/`);
  const data = await response.json();
  return data;
}