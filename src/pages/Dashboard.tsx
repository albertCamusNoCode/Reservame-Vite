import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import SideNav from "@/components/SideNav/SideNav";
import Appointments from "@/components/Dashboard/Appointments";
import Clients from "@/components/Dashboard/Clients";
import Integrations from "@/components/Dashboard/Integrations.tsx";
import Scheduler from "@/components/Dashboard/Scheduler";
import Services from "@/components/Dashboard/Services";
import { useAuth } from "../data-actions/auth"; // Import useAuth for authentication

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Destructure isLoggedIn from useAuth

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/registration");
    }
  }, [isLoggedIn, navigate]);

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
