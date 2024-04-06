import { useEffect } from "react";
import { useNavigate, Routes, Route, useLocation, Link } from "react-router-dom";
import SideNav from "@/components/Dashboard/SideNav";
import Appointments from "@/components/Dashboard/Appointments";
import Clients from "@/components/Dashboard/Clients";
import Integrations from "@/components/Dashboard/Integrations.tsx";
import ManageScheduler from "@/components/Dashboard/ManageScheduler";
import Services from "@/components/Dashboard/Services";
import { useAuth } from "../data-actions/auth"; // Import useAuth for authentication
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth(); // Destructure isLoggedIn from useAuth

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/registration");
    } else if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
      navigate("/dashboard/appointments");
    }
  }, [isLoggedIn, navigate, location.pathname]);

  if (!isLoggedIn) return null;

  return (
    <div className="flex h-screen">
      <div>
      <SideNav />
      </div>
      <div className="flex-grow w-full justify-start p-4">
        <Breadcrumb className="hidden md:flex mb-4">
          <BreadcrumbList>
            {location.pathname.split("/").filter(Boolean).map((path, index, array) => (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink asChild>
                    <Link to={`/${array.slice(0, index + 1).join("/")}`}>{path.charAt(0).toUpperCase() + path.slice(1)}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < array.length - 1 && <BreadcrumbSeparator />}
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <Routes>
          <Route path="appointments" element={<Appointments />} />
          <Route path="clients" element={<Clients />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="scheduler" element={<ManageScheduler />} />
          <Route path="services" element={<Services />} />
        </Routes>
      </div>
    </div>
  );
}
export default Dashboard;
