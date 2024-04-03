import { Client, Databases, ID } from "appwrite";
import { Appointment } from "../types";

const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("65b5f90a82a9ac01a79f"); // Your project ID

export const APPOINTMENT_DATABASE_ID = "660b84ccc57ec4e5096c"; // Replace with your database ID
export const APPOINTMENT_COLLECTION_ID = "660b84da71a2c92ed8d7"; // Replace with your collection ID

export async function addAppointment(appointment: Appointment) {
  try {
    const response = await databases.createDocument(
      APPOINTMENT_DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
      ID.unique(),
      appointment
    );
    console.log(response); // Success
  } catch (error) {
    console.log(error); // Failure
  }
}

export async function getAppointments(businessId: string) {
  try {
    const response = await databases.listDocuments(
      APPOINTMENT_DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
      [`${businessId}`] // Filter documents by businessId
    );
    console.log(response); // Success
    return response.documents as unknown as Appointment[];
  } catch (error) {
    console.log(error); // Failure
    return [];
  }
}
