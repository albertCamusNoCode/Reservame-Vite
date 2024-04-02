import { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { account } from "../lib/appwrite";
import SideNav from "@/components/SideNav/SideNav";
import Appointments from "@/components/Dashboard/Appointments";
import Clients from "@/components/Dashboard/Clients";
import Integrations from "@/components/Dashboard/Integrations.tsx";
import Scheduler from "@/components/Dashboard/Scheduler";
import Services from "@/components/Dashboard/Services";

function Dashboard() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        await account.get();
        setIsLoggedIn(true);
      } catch {
        navigate("/registration");
      }
    };
    checkLoggedIn();
  }, [navigate]);

  if (!isLoggedIn) return null;

  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-1 p-10">
        <h1>this is the Dashboard</h1>
        <Routes>
          <Route path="appointments" element={<Appointments />} />
          <Route path="clients" element={<Clients />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="scheduler" element={<Scheduler />} />
          <Route path="services" element={<Services />} />
        </Routes>
      </div>
    </div>
  );
}
export default Dashboard;
