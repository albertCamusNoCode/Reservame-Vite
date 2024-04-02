import { useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { ID, Query } from "appwrite";
import { Business } from "../types"; // Import the type and Business

export const BUSINESS_DATABASE_ID = "660b84ccc57ec4e5096c"; // Replace with your database ID
export const BUSINESS_COLLECTION_ID = "660b85fc62355c7e5e13"; // Replace with your collection ID

export function useBusiness() {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  async function add(business: Business) {
    const response = await databases.createDocument(
      BUSINESS_DATABASE_ID,
      BUSINESS_COLLECTION_ID,
      ID.unique(),
      business
    );
    setBusinesses((prevBusinesses) =>
      [{ ...business, $id: response.$id }, ...prevBusinesses].slice(0, 10)
    );
  }

  async function remove(id: string) {
    await databases.deleteDocument(
      BUSINESS_DATABASE_ID,
      BUSINESS_COLLECTION_ID,
      id
    );
    setBusinesses((prevBusinesses) =>
      prevBusinesses.filter((business) => business.$id !== id)
    );
    await init(); // Refetch businesses to ensure we have 10 items
  }

  async function init() {
    const response = await databases.listDocuments(
      BUSINESS_DATABASE_ID,
      BUSINESS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    setBusinesses(response.documents as Business[]);
  }
  useEffect(() => {
    init();
  }, []);

  return { current: businesses, add, remove };
}
