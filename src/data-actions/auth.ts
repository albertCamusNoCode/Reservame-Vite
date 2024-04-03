import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types";
import Cookies from "js-cookie";

const API_BASE_URL = "https://xvnx-2txy-671y.n7c.xano.io/api:8LWq6rLJ"; // Replace with your Xano API endpoint
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    // Attempt to get user from cookies on initial load
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) : null;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Save user to cookies whenever it changes
    if (user) {
      Cookies.set("user", JSON.stringify(user), { expires: 7 }); // Expires in 7 days
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.authToken}`;
    } else {
      Cookies.remove("user");
      delete axios.defaults.headers.common['Authorization'];
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
      const { authToken, id } = response.data;
      const newUser: User = { id, email, name, authToken, createdAt: new Date(), activeBusiness: 0 }; // Assuming default values for missing properties
      setUser(newUser);
      setLoading(false);
      return newUser;
    } catch (err) {
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
      const { authToken, id } = response.data;
      const newUser: User = { id, email, name: '', authToken, createdAt: new Date(), activeBusiness: 0 }; // Assuming default values for missing properties
      setUser(newUser); // Assuming the user state structure accommodates this change
      setLoading(false);
      return newUser;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  const authMe = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`);
      const userData: User = {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        authToken: '', // authToken is not provided by /auth/me, so we set it as an empty string
        createdAt: new Date(response.data.created_at), // Convert timestamp to Date object
        phone: response.data.phone || undefined, // Use undefined if phone is not provided
        googleOauth: response.data.google_oauth || undefined, // Use undefined if google_oauth is not provided
        activeBusiness: response.data.active_business,
      };
      setUser(userData);
      setLoading(false);
      return userData;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  return { user, loading, error, signup, login, authMe, isLoggedIn: user !== null };
};
