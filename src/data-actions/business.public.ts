import axios from "axios";
import { BusinessPublic } from "../types";

const API_BASE_URL = "https://reservame.mx/api:atCKEPpl";

export const getBusinessPublicRecords = async (): Promise<BusinessPublic[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/business_public`);
    return response.data;
  } catch (error) {
    console.error("Error fetching business public records:", error);
    throw error;
  }
};

export const addBusinessPublicRecord = async (businessPublicData: BusinessPublic): Promise<BusinessPublic> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/business_public`, businessPublicData);
    return response.data;
  } catch (error) {
    console.error("Error adding business public record:", error);
    throw error;
  }
};

export const deleteBusinessPublicRecord = async (businessPublicId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/business_public/${businessPublicId}`);
  } catch (error) {
    console.error("Error deleting business public record:", error);
    throw error;
  }
};

export const getBusinessPublicRecordById = async (businessPublicId: string): Promise<BusinessPublic> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/business_public/${businessPublicId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching business public record by ID:", error);
    throw error;
  }
};

export const editBusinessPublicRecord = async (businessPublicId: string, businessPublicData: BusinessPublic): Promise<BusinessPublic> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/business_public/${businessPublicId}`, businessPublicData);
    return response.data;
  } catch (error) {
    console.error("Error editing business public record:", error);
    throw error;
  }
};
