import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/components/Registration/Login";
import Signup from "@/components/Registration/Signup";
import { useEffect } from "react";
import { useAuth } from "../data-actions/auth"; // Adjusted import to useAuth from auth.ts

function Registration() {
  const { user } = useAuth(); // Adjusted to directly use user state for authentication status check

  useEffect(() => {
    // Effect to handle side effects if needed in the future
  }, []);

  if (user) return <Navigate to="/dashboard" />; // Directly checking user state to decide on redirection

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}
export default Registration;
