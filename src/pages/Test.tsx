import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getClients } from "@/data-actions/client";
import { useAuth } from "@/data-actions/auth";

function Test() {
  const { authToken, user } = useAuth();
    const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    console.log(authToken);
    getClients("a450935f-ccf6-4ee9-9bec-9be3506891ea", authToken).then((response) => {
        console.log(response);
     setResponse(response)
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
    <p>{JSON.stringify(user)}</p>
          <p>{JSON.stringify(response)}</p>
    </div>
    </>
  );
}

export default Test;

