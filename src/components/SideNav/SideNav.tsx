import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  UsersIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { SideNav as SideNavType } from "@/types";
import { account } from "@/lib/appwrite"; // Import Appwrite account SDK
import { Button } from "@/components/ui/button"; // Import Button from UI components

const sideNavLabels: SideNavType[] = [
  {
    id: 1,
    label: "Appointments",
    icon: CalendarIcon,
    current: false,
    route: "/dashboard/appointments",
  },
  {
    id: 2,
    label: "Clients",
    icon: UsersIcon,
    current: false,
    route: "/dashboard/clients",
  },
  {
    id: 3,
    label: "Services",
    icon: FolderIcon,
    current: false,
    route: "/dashboard/services",
  },
  {
    id: 4,
    label: "Scheduler",
    icon: ChartPieIcon,
    current: false,
    route: "/dashboard/scheduler",
  },
  {
    id: 5,
    label: "Integrations",
    icon: DocumentDuplicateIcon,
    current: false,
    route: "/dashboard/integrations",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SideNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserAvatar(user.prefs.avatar); // Set user avatar from Appwrite user preferences
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleNavigation = (route: string) => {
    navigate(route);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // Deletes the current session
      navigate("/registration"); // Navigate to registration page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-card">
                <div className="flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between p-4">
                    <h2 className="text-lg font-bold text-foreground">
                      Reservame
                    </h2>
                    <Button
                      onClick={() => setSidebarOpen(false)}
                      className="-mr-2 p-2 text-muted hover:text-muted-foreground"
                      variant="outline">
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Button>
                  </div>
                  <nav className="px-2">
                    <div className="space-y-1">
                      {sideNavLabels.map((item) => (
                        <Button
                          key={item.id}
                          onClick={() => handleNavigation(item.route)}
                          className={classNames(
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer"
                          )}
                          variant="outline">
                          <item.icon
                            className="mr-4 h-6 w-6"
                            aria-hidden="true"
                          />
                          {item.label}
                        </Button>
                      ))}
                      {/* Logout Button */}
                      <Button
                        onClick={handleLogout}
                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer"
                        variant="outline">
                        <ArrowRightOnRectangleIcon
                          className="mr-4 h-6 w-6"
                          aria-hidden="true"
                        />
                        Logout
                      </Button>
                      {/* Profile Icon */}
                      <div className="pt-4">
                        <Avatar>
                          <AvatarImage
                            src={userAvatar || "https://github.com/shadcn.png"}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto bg-card p-4">
          <h2 className="text-lg font-bold text-foreground">Reservame</h2>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {sideNavLabels.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleNavigation(item.route)}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer"
                variant="outline">
                <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
                {item.label}
              </Button>
            ))}
            {/* Logout Button for larger screens */}
            <Button
              onClick={handleLogout}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer"
              variant="outline">
              <ArrowRightOnRectangleIcon
                className="mr-3 h-6 w-6"
                aria-hidden="true"
              />
              Logout
            </Button>
            {/* Profile Icon for larger screens */}
            <div className="pt-4">
              <Avatar>
                <AvatarImage
                  src={userAvatar || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideNav;
