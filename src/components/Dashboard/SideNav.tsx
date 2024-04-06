import { Link, Navigate } from "react-router-dom";
import { Bell, Package2, UsersIcon, CalendarIcon, ClipboardIcon, PlugIcon, PackageIcon, LogOut } from "lucide-react";
import { useAuth } from "@/data-actions/auth"; // Import useAuth hook for logout functionality

const SideNav = () => {
  const { logout } = useAuth(); // Destructure logout function from useAuth

  const handleLogout = async () => {
    await logout(); // Use logout function from useAuth
    <Navigate to="/registration" replace={true} /> // Use Navigate component from react-router-dom to navigate to registration page after logout
  };

  const navItems = [
    { label: "Appointments", icon: ClipboardIcon, route: "/dashboard/appointments" },
    { label: "Clients", icon: UsersIcon, route: "/dashboard/clients" },
    { label: "Services", icon: PackageIcon, route: "/dashboard/services" },
    { label: "Scheduler", icon: CalendarIcon, route: "/dashboard/scheduler" },
    { label: "Integrations", icon: PlugIcon, route: "/dashboard/integrations" },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span>Acme Inc</span>
            </Link>
            <button
              className="ml-auto h-8 w-8 flex items-center justify-center rounded-lg border border-transparent bg-transparent p-1 text-muted-foreground hover:text-primary transition-all"
            >
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 gap-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.route}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-foreground bg-muted/20 transition-all ${window.location.pathname === item.route ? 'text-white bg-primary/90' : 'hover:bg-primary/30'}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="mt-auto mb-4 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;


