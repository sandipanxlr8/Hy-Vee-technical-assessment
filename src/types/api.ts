export interface AgifyResponse {
  name: string;
  age: number;
  count: number;
}

export interface GenderizeResponse {
  name: string;
  gender: string;
  probability: number;
}

export interface NationalizeResponse {
  name: string;
  country: [
    {
      country_id: string;
      probability: number;
    }
  ];
}
