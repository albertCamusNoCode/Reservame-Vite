import axios from "axios";
import { Client } from "../types";
import { useCookies } from "react-cookie"; // Import useCookies from react-cookie

const API_BASE_URL = "https://reservame.mx/api:atCKEPpl";

export const getClientsByBusinessId = async (businessId: string): Promise<Client[]> => {
  const [cookies] = useCookies(['_rsrvme_jwt']); // Use useCookies to access the cookies
  try {
    const response = await axios.get<Client[]>(`${API_BASE_URL}/clients/${businessId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies._rsrvme_jwt}`, // Use the auth token from the cookie for authorization
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};
