import { getClients } from "@/data-actions/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Client } from "@/types";
import { useEffect, useState } from "react";
import { useAuth } from "@/data-actions/auth";

export default function ClientTable() {
  const { user, authToken } = useAuth();
  const businessId = user?.active_business || '';
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const cacheKey = `clients-${businessId}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    try {
      console.log(user);
      console.log(`Fetching clients for businessId: ${businessId} with authToken: ${authToken}`);
      const response = await getClients(businessId, authToken || '');
      console.log("Response from getClients:", response);
      localStorage.setItem(cacheKey, JSON.stringify(response.items));
      setData(response.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [businessId, authToken]); // Depend on businessId and authToken to refetch if these change

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
