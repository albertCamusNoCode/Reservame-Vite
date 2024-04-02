import { useEffect } from "react";
import { useBusiness } from "../../data/business";
import { Business } from "../../types"; // Import the Business type

function Appointments() {
  const { current: userBusinesses } = useBusiness(); // Directly destructure the current businesses from the useBusiness hook

  useEffect(() => {
    // Any required side effects related to businesses can be handled here
  }, [userBusinesses]); // Depend on userBusinesses for effects

  return (
    <div>
      <h1>This is the Appointment Page</h1>
      <div>
        {userBusinesses.map((business: Business) => (
          <div key={business.$id ? business.$id : undefined}>
            <h2>{business.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Appointments;
