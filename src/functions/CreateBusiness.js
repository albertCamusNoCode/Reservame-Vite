export default async ({ req, res }) => {
  // Check if the request method is GET
  if (req.method === "GET") {
    // Create an array of days in a week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Send the array of days as a JSON response
    return res.json(daysOfWeek);
  } else {
    // If the request method is not GET, send a 405 Method Not Allowed status code
    return res.status(405).send("Method Not Allowed");
  }
};
