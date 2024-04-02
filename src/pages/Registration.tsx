import { Routes, Route } from "react-router-dom";
import Login from "@/components/Registration/Login";
import Signup from "@/components/Registration/Signup";

function Registration() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}
export default Registration;
