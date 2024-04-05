import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { User } from "../types";
import { useCookies } from "react-cookie"; // Documentation: https://www.npmjs.com/package/react-cookie

const API_BASE_URL = "https://reservame.mx/api:h1KIKrRI"; // Replace with your Xano API endpoint
const COOKIE_EXPIRATION_MS = 604800000; // 7 days in milliseconds
const COOKIE_SECURE = false; // Secure parameter for cookie setting

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(['_rsrvme_jwt']); // Utilizing react-cookie for cookie management

  const fetchUser = useCallback(async (authToken: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const userData: User = {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        createdAt: new Date(response.data.created_at),
        phone: response.data.phone || undefined,
        googleOauth: response.data.google_oauth || undefined,
        activeBusiness: response.data.active_business,
      };
      setUser(userData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const authToken = cookies._rsrvme_jwt;
    if (authToken && !user) {
      fetchUser(authToken);
    }
  }, [cookies._rsrvme_jwt, user, fetchUser]);

  const setAuthToken = (authToken: string) => {
    setCookie("_rsrvme_jwt", authToken, { path: '/', expires: new Date(Date.now() + COOKIE_EXPIRATION_MS), secure: COOKIE_SECURE, sameSite: 'strict' });
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  };

  const logout = () => {
    removeCookie("_rsrvme_jwt", { path: '/' });
    setUser(null); // Clear user data upon logout
    delete axios.defaults.headers.common['Authorization']; // Remove the Authorization header
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, { email, password, name });
      if (response.data.authToken) {
        const authToken = response.data.authToken;
        setAuthToken(authToken);
        await fetchUser(authToken);
      } else {
        throw new Error(`Signup failed: ${response.data.message || 'Unknown error'}`);
      }
    } catch (err) {
      setError(err as Error);
      throw err; // Rethrow the error to be handled by the caller
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ authToken?: string }> => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      // Check if response.data exists and has an authToken property
      if (response.status === 200 && response.data && 'authToken' in response.data) {
        const authToken = response.data.authToken;
        setAuthToken(authToken);
        await fetchUser(authToken);
        // Return an object with the authToken to resolve the TypeScript error
        return { authToken };
      } else {
        // If the response status is 200 but there's no authToken, it means login failed
        const errorMessage = response.data && response.data.message ? response.data.message : 'Invalid email or password';
        throw new Error(`Login failed: ${errorMessage}`);
      }
    } catch (err) {
      setError(err as Error);
      // It might be useful to rethrow the error or return an empty object to indicate failure
      return {};
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, signup, login, logout, isLoggedIn: !!cookies._rsrvme_jwt };
};

