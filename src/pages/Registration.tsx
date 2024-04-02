import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/components/Registration/Login";
import Signup from "@/components/Registration/Signup";
import { useEffect, useState } from "react";
import { account } from "../lib/appwrite";

function Registration() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkLoggedIn();
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
