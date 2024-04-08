import axios from "axios";
import { Appointment } from "../types";

const API_BASE_URL = "https://reservame.mx/api:atCKEPpl";

export const getAppointments = async (options: {
  business_id: string;
  date_from?: string | null;
  date_to?: string | null;
  sort?: Record<string, any>;
  search?: Record<string, any>;
  page?: number;
  per_page?: number;
}): Promise<Appointment[]> => {
  const { business_id, date_from = null, date_to = null, sort = {}, search = {}, page = null, per_page = null } = options;
  const params = {
    business_id,
    date_from,
    date_to,
    sort,
    search,
    page,
    per_page
  };
  const response = await axios.get(`${API_BASE_URL}/appointments`, { params });
  return response.data;
}

export const addAppointment = async (appointmentData: {
  business_id: string;
  client_phone: string;
  appt_time: string | null;
  appt_duration: number;
  business_service_id: string;
}): Promise<Appointment> => {
  try {
    const response = await axios.post<{data: Appointment}>(`${API_BASE_URL}/appointment`, {
      business_id: appointmentData.business_id,
      client_phone: appointmentData.client_phone,
      appt_time: appointmentData.appt_time,
      appt_duration: appointmentData.appt_duration,
      business_service_id: appointmentData.business_service_id,
    });
    const appointmentResponse: Appointment = {
      id: response.data.data.id,
      created_at: response.data.data.created_at,
      business_id: response.data.data.business_id,
      client_phone: response.data.data.client_phone,
      client_id: response.data.data.client_id,
      appt_time: response.data.data.appt_time,
      appt_duration: response.data.data.appt_duration,
      business_service_id: response.data.data.business_service_id,
    };
    return appointmentResponse;
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
    const response = await axios.get<{data: Appointment}>(`${API_BASE_URL}/appointment/${appointmentId}`);
    const formattedResponse: Appointment = {
      id: response.data.data.id,
      created_at: response.data.data.created_at,
      business_id: response.data.data.business_id,
      client_phone: response.data.data.client_phone,
      client_id: response.data.data.client_id,
      appt_time: response.data.data.appt_time,
      appt_duration: response.data.data.appt_duration,
      business_service_id: response.data.data.business_service_id,
    };
    return formattedResponse;
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
