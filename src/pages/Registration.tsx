import Login from "@/components/Registration/Login";
import Signup from "@/components/Registration/Signup";
import { useState } from "react";

export default function Registration() {
  return (
    <div>
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Signup setShowLogin={setShowLogin} />
      )}
    </div>
  );
}