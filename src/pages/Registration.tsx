import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "@/components/Registration/Login";
import Signup from "@/components/Registration/Signup";
import { useEffect } from "react";
import { useAuth } from "../data-actions/auth"; // Adjusted import to useAuth from auth.ts

function Registration() {
  const { user } = useAuth(); // Adjusted to directly use user state for authentication status check
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard"); // Navigate to dashboard if user is already logged in
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}
export default Registration;
