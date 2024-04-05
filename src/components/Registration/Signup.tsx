import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../../data-actions/auth"; // Updated import to use useAuth

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track if passwords match
  const [name, setName] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signup } = useAuth(); // Destructure signup from useAuth

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false); // Set passwordsMatch to false if passwords do not match
      toast({
        title: "Error",
        description: "Passwords do not match. Please try again.",
      });
      return;
    }
    setLoading(true);
    try {
      await signup(email, password, name);
      toast({
        title: "Success",
        description: "Account created successfully. You are now logged in.",
      });
      navigate("/dashboard"); // Navigate to dashboard on successful signup
    } catch (error) {
      console.error("Failed to register account:", error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
      });
      return; // Ensure no further execution in case of error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm flex-grow"> {/* Adjusted to flex grow horizontally */}
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Create an account to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSignup}>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            {!passwordsMatch && (
              <div className="text-sm text-red-500">Passwords do not match.</div> // Display help text if passwords do not match
            )}
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordsMatch(true); // Reset passwordsMatch to true on change
              }}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? (
              <Lottie animationData={lottieLoader} loop={true} />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="#" className="underline" onClick={(e) => {
              e.preventDefault();
              navigate("/registration/login");
            }}>
            Login
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default Signup;

