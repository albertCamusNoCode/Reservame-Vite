import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { SideNav as SideNavType } from "@/types";

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
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
    setSidebarOpen(false);
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
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col">
                <div className="flex-1 overflow-y-auto bg-white">
                  <div className="flex items-center justify-between p-4">
                    <h2 className="text-lg font-bold">Reservame</h2>
                    <button
                      type="button"
                      className="-mr-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <nav className="px-2">
                    <div className="space-y-1">
                      {sideNavLabels.map((item) => (
                        <a
                          key={item.id}
                          onClick={() => handleNavigation(item.route)}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer"
                          )}>
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto bg-white p-4">
          <h2 className="text-lg font-bold">Reservame</h2>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {sideNavLabels.map((item) => (
              <a
                key={item.id}
                onClick={() => handleNavigation(item.route)}
                className={classNames(
                  item.current
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer"
                )}>
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideNav;
