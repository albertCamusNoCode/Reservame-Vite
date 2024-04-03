import axios from "axios";
import { Appointment } from "../types";

const API_BASE_URL = "https://xvnx-2txy-671y.n7c.xano.io/api:yvsnt5w1";

export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await axios.get<Appointment[]>(`${API_BASE_URL}/appointment`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const addAppointment = async (appointmentData: Appointment): Promise<Appointment> => {
  try {
    const response = await axios.post<Appointment>(`${API_BASE_URL}/appointment`, appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error adding appointment:", error);
    throw error;
  }
};

export const deleteAppointment = async (appointmentId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/appointment/${appointmentId}`);
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

export const getAppointmentById = async (appointmentId: string): Promise<Appointment> => {
  try {
    const response = await axios.get<Appointment>(`${API_BASE_URL}/appointment/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment by ID:", error);
    throw error;
  }
};

export const editAppointment = async (appointmentId: string, appointmentData: Partial<Appointment>): Promise<Appointment> => {
  try {
    const response = await axios.patch<Appointment>(`${API_BASE_URL}/appointment/${appointmentId}`, appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error editing appointment:", error);
    throw error;
  }
};
