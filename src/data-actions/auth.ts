import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://xvnx-2txy-671y.n7c.xano.io/api:8LWq6rLJ"; // Replace with your Xano API endpoint

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        email,
        password,
        name,
      });
      setUser(response.data);
      setLoading(false);
      return response.data;
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
      setUser(response.data);
      setLoading(false);
      return response.data;
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
