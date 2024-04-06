import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import NoPage from "./pages/404";
import { Toaster } from "./components/ui/toaster";
import Schedule from "./pages/Schedule";
import OAuth2Callback from "./pages/Oauth";
import Test from "./pages/Test";

const App = () => {
  return (
    
    <React.StrictMode>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="registration/*" element={<Registration />} />
          <Route path="schedule/*" element={<Schedule />} />
          <Route path="oauth2/callback" element={<OAuth2Callback />} /> // Corrected route for OAuth2 callback
          <Route path="*" element={<NoPage />} />
          <Route path="test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
