import { API_URL } from "./settings";

export async function getTemperature() {
  const response = await fetch(`${API_URL}/temp/`);
  const data = await response.json();
  return data;
}