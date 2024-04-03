import axios from "axios";
import { Business } from "../types";

const API_BASE_URL = "https://xvnx-2txy-671y.n7c.xano.io/api:yvsnt5w1";

export const getBusinesses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/business`);
    return response.data;
  } catch (error) {
    console.error("Error fetching businesses:", error);
    throw error;
  }
};

export const addBusiness = async (Business: Business): Promise<Business> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/business`, Business);
    return response.data;
  } catch (error) {
    console.error("Error adding business:", error);
    throw error;
  }
};

export const deleteBusiness = async (businessId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/business/${businessId}`);
  } catch (error) {
    console.error("Error deleting business:", error);
    throw error;
  }
};

export const getBusinessById = async (businessId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/business/${businessId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching business by ID:", error);
    throw error;
  }
};

export const editBusiness = async (businessId: string, business: Business): Promise<Business> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/business/${businessId}`, business);
    return response.data;
  } catch (error) {
    console.error("Error editing business:", error);
    throw error;
  }
};
