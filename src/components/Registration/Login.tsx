import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../data-actions/auth"; // Import auth from @auth as rest API functions from Xano
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Lottie from "lottie-react";
import lottieLoader from "../../../public/lottie-loader.json";
import { useToast } from "@/components/ui/use-toast"; // Added for toast notification

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast(); // Using toast
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login, user, and isLoggedIn from useAuth

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
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleLogin}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* Removed Next Link for forgot password */}
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? (
              <Lottie animationData={lottieLoader} loop={true} />
            ) : (
              "Login"
            )}
          </Button>
          {/* Removed "Login with Google" button as it's not implemented in the original code */}
          <div className="mt-4 text-center text-sm">
            Don't have an account?&nbsp;
            <a
              href="#"
              className="underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/registration/signup"); // Corrected navigation
              }}
            >
              Sign Up
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;

