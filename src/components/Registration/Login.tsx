import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../data-actions/auth"; // Import auth from @auth as rest API functions from Xano
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import lottieLoader from "../../../public/lottie-loader.json";
import { useToast } from "@/components/ui/use-toast"; // Added for toast notification

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast(); // Using toast
  const navigate = useNavigate();
  const { login, user } = useAuth(); // Destructure login, user, and isLoggedIn from useAuth

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "You are now logged in.",
      });
      navigate("/dashboard"); // Navigate to dashboard on successful login
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
          Login
        </h2>
        <div className="text-center my-4">
          <p className="text-gray-600 dark:text-gray-300">
            {user ? `Logged in as ${user.email}` : "Not logged in"}
          </p>
        </div>
        <form
          className="mt-8 space-y-3"
          onSubmit={handleLogin}>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="w-full py-2 px-4 text-center bg-indigo-600 rounded-md text-white text-sm hover:bg-indigo-500"
              type="submit">
              {loading ? (
                <Lottie animationData={lottieLoader} loop={true} />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?&nbsp;
          <a
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/registration/signup"); // Corrected navigation
            }}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
