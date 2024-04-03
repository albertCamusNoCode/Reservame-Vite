import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import lottieLoader from "../../../public/lottie-loader.json";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../../data-actions/auth"; // Updated import to use useAuth

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signup } = useAuth(); // Destructure signup from useAuth

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
          Sign Up
        </h2>
        <form
          className="mt-8 space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
              const userData = await signup(email, password, name);
              toast({
                title: "Success",
                description:
                  "Account created successfully. You are now logged in.",
              });
              navigate("/dashboard"); // Navigate to dashboard on successful login
            } catch (error) {
              console.error("Failed to register account:", error);
              toast({
                title: "Error",
                description: "Failed to create account. Please try again.",
              });
            } finally {
              setLoading(false);
            }
          }}>
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="space-y-1">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              placeholder="Confirm your password"
              required
              type="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="w-full py-2 px-4 text-center bg-indigo-600 rounded-md text-white text-sm hover:bg-indigo-500"
              type="submit">
              {loading ? (
                <Lottie animationData={lottieLoader} loop={true} />
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Already have an account?&nbsp;
          <a
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/registration/login");
            }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
