import type { ApiResponse } from "../types/artwork";

const BASE_URL = "https://api.artic.edu/api/v1/artworks";

export const fetchArtworks = async (page: number): Promise<ApiResponse> => {
  const response = await fetch(
    `${BASE_URL}?page=${page}&limit=12&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch artworks");
  }

  return response.json();
};
