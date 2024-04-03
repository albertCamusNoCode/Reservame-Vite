import { useEffect } from "react";
import { useBusiness } from "../../data-actions/business";
import { Business } from "../../types"; // Import the Business type
import { Button } from "../ui/button";
import { addAppointment } from "../../data-actions/appointment";
import { Appointment } from "../../types";

function Appointments() {
  const { current: userBusinesses } = useBusiness(); // Directly destructure the current businesses from the useBusiness hook

  useEffect(() => {
    // Any required side effects related to businesses can be handled here
  }, [userBusinesses]); // Depend on userBusinesses for effects

  const handleAddAppointment = async () => {
    const appointmentDate = new Date(Date.now());
    const appointment: Appointment = {
      time: appointmentDate,
      phoneNumber: "0000000000", // Placeholder phone number
      business: userBusinesses[0]?.$id || "", // Ensuring business ID is a string
    };
    await addAppointment(appointment);
  };

  return (
    <>
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
      <div>
        <Button onClick={handleAddAppointment}>Add Appointment</Button>
      </div>
    </>
  );
}
export default Appointments;
