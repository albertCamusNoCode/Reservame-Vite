import { useNavigate } from "react-router-dom";
import { ChevronRight, Mountain, Users, Package, Calendar, Clipboard, Plug } from "lucide-react";
import { useAuth } from "@/data-actions/auth"; // Import useAuth hook for logout functionality

const SideNav = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Destructure logout function from useAuth

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const handleLogout = async () => {
    await logout(); // Use logout function from useAuth
    navigate("/registration"); // Navigate to registration page after logout
  };

  return (
    <div className="h-full w-[240px] flex flex-col bg-gray-800 text-white">
      <div className="flex items-center justify-start h-16 px-6">
        <Mountain className="h-6 w-6 text-white" />
        <span className="ml-2 text-lg font-semibold">Acme Inc</span>
      </div>
      <nav className="flex flex-col gap-2 px-6 py-4">
        {[
          { label: "Clients", icon: Users, route: "/dashboard/clients" },
          { label: "Services", icon: Package, route: "/dashboard/services" },
          { label: "Scheduler", icon: Calendar, route: "/dashboard/scheduler" },
          { label: "Appointments", icon: Clipboard, route: "/dashboard/appointments" },
          { label: "Integrations", icon: Plug, route: "/dashboard/integrations" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavigation(item.route)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 transition-colors hover:bg-gray-700 hover:text-white"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 transition-colors hover:bg-gray-700 hover:text-white mt-2"
        >
          <ChevronRight className="h-5 w-5" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default SideNav;

