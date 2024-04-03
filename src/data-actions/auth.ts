import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types";
import Cookies from "js-cookie";


const API_BASE_URL = "https://xvnx-2txy-671y.n7c.xano.io/api:8LWq6rLJ"; // Replace with your Xano API endpoint
export const useAuth = () => {
  const [user, setUser] = useState<User>(() => {
    // Attempt to get user from cookies on initial load
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const { authToken } = response.data;
      setUser({ email, name, authToken });
      setLoading(false);
      return { email, name, authToken };
    } catch (err) {
      setError(err as any);
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
      const { authToken } = response.data;
      setUser({ email, name: '', authToken }); // Assuming the user state structure accommodates this change
      setLoading(false);
      return { email, name: '', authToken };
    } catch (err) {
      setError(err as any);
      setLoading(false);
      throw err;
    }
  };

  const authMe = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`);
      setUser(response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err as any);
      setLoading(false);
      throw err;
    }
  };

  return { user, loading, error, signup, login, authMe, isLoggedIn: user !== null };
};
