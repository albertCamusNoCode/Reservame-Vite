import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { getCoreRowModel, getPaginationRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { getAppointments } from "@/data-actions/appointment";
import { useAuth } from "@/data-actions/auth";
import { Appointment } from "@/types";

function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { user } = useAuth(); // Moved useAuth hook call to the top level

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const business = {business_id: user?.active_business || ''};
        console.log("Fetching appointments for business:", business);
        const appointmentsData = await getAppointments(business);
        console.log("Fetched appointments:", appointmentsData);
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, [user]); // Added user as a dependency

  const table = useReactTable({
    data: appointments,
    columns: [
      { header: "Client Name", accessorKey: "client_name" },
      { header: "Date", accessorKey: "date" },
      { header: "Time", accessorKey: "time" },
      { header: "Status", accessorKey: "status" },
      { header: "Actions", id: "actions" },
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>
          View and manage your appointments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <div className={cn("flex items-center space-x-2")}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                 <TableCell key={cell.id}>
                    {cell.column.id === "status" ? (
                      <Badge variant="outline">{flexRender(cell.column.columnDef.cell, cell.getContext())}</Badge>
                    ) : cell.column.id === "actions" ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Pagination className="flex items-center justify-between px-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {table.getPageCount() > 1 && Array.from(Array(table.getPageCount()).keys()).map(pageIndex => (
              <PaginationItem key={pageIndex}>
                <PaginationLink href="#" isActive={table.getState().pagination.pageIndex === pageIndex} onClick={() => table.setPageIndex(pageIndex)}>
                  {pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}

export default Appointments;
