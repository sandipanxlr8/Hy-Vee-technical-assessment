import {
  AgifyResponse,
  GenderizeResponse,
  NationalizeResponse,
} from "../types/api";

const agifyUrl = "https://api.agify.io?name=";
const genderizeUrl = "https://api.genderize.io?name=";
const nationalizeUrl = "https://api.nationalize.io?name=";

export const fetchAge = async (name: string): Promise<AgifyResponse> => {
  const response = await fetch(`${agifyUrl}${name}`);
  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }
  return response.json();
};

export const fetchGender = async (name: string): Promise<GenderizeResponse> => {
  const response = await fetch(`${genderizeUrl}${name}`);
  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }
  return response.json();
};

export const fetchCountry = async (
  name: string
): Promise<NationalizeResponse> => {
  const response = await fetch(`${nationalizeUrl}${name}`);
  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }
  return response.json();
};
