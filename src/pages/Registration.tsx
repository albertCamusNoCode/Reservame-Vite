import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/components/Registration/Login";
import Signup from "@/components/Registration/Signup";
import { useEffect, useState } from "react";
import { useAuth } from "../data-actions/auth"; // Adjusted import to useAuth from auth.ts

function Registration() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { authMe } = useAuth(); // Adjusted to use authMe function from useAuth for authentication status check

  useEffect(() => {
    const verifyAuthStatus = async () => {
      try {
        await authMe(); // Using authMe to verify if user is authenticated
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    verifyAuthStatus();
  }, []);

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}
export default Registration;
