import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import NoPage from "./pages/404";
import { Toaster } from "./components/ui/toaster";
import Reserva from "./pages/Reserva";
import OAuth2Callback from "./pages/Oauth"; // Corrected import statement

const App = () => {
  return (
    
    <React.StrictMode>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="registration/*" element={<Registration />} />
          <Route path="reserva/*" element={<Reserva />} />
          <Route path="oauth2/callback" element={<OAuth2Callback />} /> // Corrected route for OAuth2 callback
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
