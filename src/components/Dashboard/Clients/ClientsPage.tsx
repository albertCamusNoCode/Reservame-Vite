import ClientTable from "@/components/Dashboard/Clients/ClientTable";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ClientsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Clients</CardTitle>
            <CardDescription>
              View and manage your clients.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ClientTable />
      </CardContent>
    </Card>
  );
}
