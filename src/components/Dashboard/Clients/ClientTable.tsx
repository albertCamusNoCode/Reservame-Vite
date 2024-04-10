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

  useEffect(() => {
    let isMounted = true; // Flag to prevent state update if the component is unmounted
    const cachedClients = sessionStorage.getItem('cachedClients');
    const fetchData = async () => {
      if (cachedClients) {
        console.log("Using cached clients");
        setData(JSON.parse(cachedClients).items);
      } else {
        try {
          const response = await getClients(businessId, authToken || '');
          if (isMounted) {
            setData(response.items);
            sessionStorage.setItem('cachedClients', JSON.stringify({ businessId, items: response.items })); // Cache the fetched clients
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
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
