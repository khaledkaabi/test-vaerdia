import axios from "axios";
import { NEO } from "../types/neo";

const API_URL = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY";

export const fetchNEOs = async (): Promise<NEO[]> => {
  const response = await axios.get(API_URL);
  return response.data.near_earth_objects;
};
