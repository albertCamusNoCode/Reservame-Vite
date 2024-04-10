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
  const [page, setPage] = useState(1); // For pagination
  const [perPage, setPerPage] = useState(10); // Number of items per page
  const [searchQuery, setSearchQuery] = useState(''); // For search
  const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' }>({ field: 'date', direction: 'asc' }); // For sorting

  useEffect(() => {
    let isMounted = true; // Flag to prevent state update if the component is unmounted
    const cachedAppointments = sessionStorage.getItem('cachedAppointments');
    const fetchAppointments = async () => {
      if (cachedAppointments) {
        console.log("Using cached appointments");
        setAppointments(JSON.parse(cachedAppointments));
      } else {
        try {
          const appointmentsData = await getAppointments({
            business_id: user?.active_business || '',
            date_from: null, // Adjust based on your requirements
            date_to: null, // Adjust based on your requirements
            sort: { [sort.field]: sort.direction },
            search: searchQuery ? { query: searchQuery } : undefined,
            page,
            per_page: perPage,
          });
          console.log("Fetched appointments:", appointmentsData);
          if (isMounted) {
            setAppointments(appointmentsData);
            sessionStorage.setItem('cachedAppointments', JSON.stringify(appointmentsData)); // Cache the fetched appointments
          }
        } catch (error) {
          console.error("Failed to fetch appointments:", error);
        }
      }
    };

    if (!cachedAppointments || !user) { // Fetch appointments if not cached or user changes
      fetchAppointments();
    }

    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, [user, page, perPage, searchQuery, sort]); // Updated dependency array

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
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>
              View and manage your appointments.
            </CardDescription>
          </div>
          
          {/* Example sorting button for date */}
          
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input" // Add appropriate classes for styling
          />
          </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <div className={cn("flex items-center gap-2 space-x-2")}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <button onClick={() => setSort({ field: header.column.columnDef.header, direction: sort.direction === 'asc' ? 'desc' : 'asc' })}>
                      {sort.direction === 'asc' ? '🔼' : '🔽'}
          </button>
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
                <PaginationLink href="#" isActive={table.getState().pagination.pageIndex === pageIndex} onClick={(e) => { e.preventDefault(); setPage(pageIndex + 1); }}>
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
