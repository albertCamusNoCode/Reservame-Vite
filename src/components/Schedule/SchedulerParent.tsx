import { SchedulerStep } from "./Step 1/SchedulerStep";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card } from "../ui/card";
import { getBusinessPublicRecordById } from "@/data-actions/business.public";
import { useEffect, useState } from "react";
import { BusinessPublic } from "@/types";

   // Fetch business.public on page load

export default function SchedulerComponent() {
  const [businessPublic, setBusinessPublic] = useState<BusinessPublic | null>(null);
  const queryParams = new URLSearchParams(window.location.search);
  const businessId = queryParams.get('bid') || ''; // Ensuring businessId is never null

  useEffect(() => {
    getBusinessPublicRecordById(businessId).then((response) => {
        console.log("Public Business:", response);
        setBusinessPublic(response);
    });
  }, []);

  return (
    <>
    <Card className="bg-white p-8 rounded-lg max-w-3xl mx-auto my-12">
      <div>
        
      </div>
      <div>
      <h1 className="text-2xl font-semibold mb-6 flex justify-center">{businessPublic?.business_name} | Reservaciones</h1>
      </div>
      <div>
      <Button size="icon" variant="outline">
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      </div>
      <div>
    <SchedulerStep businessPublic={businessPublic} businessId={businessId} />
    </div>
    </Card>
    </>
    );
}

