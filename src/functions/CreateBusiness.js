import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
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
  res.json(daysOfWeek);
});

router.use((req, res) => {
  // If the request method is not GET, send a 405 Method Not Allowed status code
  res.status(405).send("Method Not Allowed");
});

export default router;
