import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types";
import Cookies from "js-cookie";

const API_BASE_URL = "https://xvnx-2txy-671y.n7c.xano.io/api:8LWq6rLJ"; // Replace with your Xano API endpoint
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      // If the authToken exists, fetch the user details from the server
      authMe();
    }
  }, []);

  useEffect(() => {
    if (user) {
      const authToken = Cookies.get("authToken");
      console.log("Saving authToken to cookies:", authToken);
      Cookies.set("authToken", authToken ?? '', { expires: 7, secure: true, sameSite: 'Strict' });
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken ?? ''}`;
    } else {
      
    }
  }, [user]);

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        email,
        password,
        name,
      });
      console.log("API response:", response.data); // This will show you the structure of the response
      const newUser: User = { id: '', email, name, createdAt: new Date(), activeBusiness: 0 }; // Assuming default values for missing properties
      console.log("New user object:", newUser); // Add this right before setUser(newUser) in both signup and login functions
      setUser(newUser);
      setLoading(false);
      return newUser;
    } catch (err) {
      console.error("Error in signup:", err); // Enhanced error handling as per instructions
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      console.log("API response:", response.data); // This will show you the structure of the response
      const newUser: User = { id: '', email, name: '', createdAt: new Date(), activeBusiness: 0 }; // Assuming default values for missing properties
      console.log("New user object:", newUser); // Add this right before setUser(newUser) in both signup and login functions
      setUser(newUser); // Assuming the user state structure accommodates this change
      setLoading(false);
      return newUser;
    } catch (err) {
      console.error("Error in login:", err); // Enhanced error handling as per instructions
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  const authMe = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      });
      const userData: User = {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        createdAt: new Date(response.data.created_at), // Convert timestamp to Date object
        phone: response.data.phone || undefined, // Use undefined if phone is not provided
        googleOauth: response.data.google_oauth || undefined, // Use undefined if google_oauth is not provided
        activeBusiness: response.data.active_business,
      };
      console.log("User from authMe:", userData); // Added console log
      setUser(userData);
      setLoading(false);
      return userData;
    } catch (err) {
      console.error("Error in authMe:", err); // Enhanced error handling as per instructions
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };
  return { user, loading, error, signup, login, authMe, isLoggedIn: user !== null };
};
