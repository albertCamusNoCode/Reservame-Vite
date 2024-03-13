import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SideNav = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold">Reservame</h1>
      <DropdownMenu>
        <Dropdown><h1 className="text-xl font-bold">Reservame</h1></div>
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuSideNav     </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SideNav;
