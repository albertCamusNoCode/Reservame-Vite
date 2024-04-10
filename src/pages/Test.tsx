import { getBusinessPublicRecordById } from "@/data-actions/business.public";
import { useEffect, useState } from "react";
import { BusinessPublic } from "@/types";
import { Button } from "@/components/ui/button";

function Test() {
    const [businessPublic, setBusinessPublic] = useState<BusinessPublic | null>(null);

  useEffect(() => {
    getBusinessPublicRecordById("a450935f-ccf6-4ee9-9bec-9be3506891ea").then((response) => {
        console.log(response);
        setBusinessPublic(response);
    });
  }, []);

  return (
    <>
    <Button variant="unclickable">Test</Button>
    <Button variant="ghost">Test</Button>
    <Button variant="disabled">Test</Button>
    <Button variant="default">Test</Button>
    <Button variant="secondary">Test</Button>

    <div>
      {businessPublic ? (
        <div>
          <p>ID: {businessPublic.id}</p>
          <p>Business ID: {businessPublic.business_id}</p>
          <p>Days Open: {businessPublic.days_open.join(', ')}</p>
          <p>Appointment Interval: {businessPublic.appt_interval}</p>
          <p>Is Active: {businessPublic.is_active ? 'Yes' : 'No'}</p>
          <p>Business Name: {businessPublic.business_name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
}

export default Test;

