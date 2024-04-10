import axios from "axios";
import { Client } from "../types";
// Removed the import for useCookies as it's no longer used here

const API_BASE_URL = "https://reservame.mx/api:atCKEPpl";

export const getClients = async (businessId: string, authToken: string): Promise<{items: Client[], pagination: {itemsReceived: number, curPage: number, nextPage: null | number, prevPage: null | number, offset: number}}> => {
  try {
    const response = await axios.get<{items: Client[], pagination: {itemsReceived: number, curPage: number, nextPage: null | number, prevPage: null | number, offset: number}}>(`${API_BASE_URL}/clients/${businessId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Use the auth token passed as a parameter
      }
    });
    return {
      items: response.data.items,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};
