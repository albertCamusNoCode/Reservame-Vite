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
import { useAuth } from "../../data-actions/auth"; // Ensure this is at the top level

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [name, setName] = useState<string>("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signup, initiateGoogleLogin } = useAuth(); // Destructure here

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

  const handleGoogleInit = async () => {
    setGoogleLoading(true);
    try {
      const redirectUri = "http://localhost:3000/oauth2/callback";
      const { authUrl } = await initiateGoogleLogin(redirectUri); // Use directly without calling useAuth again
      if (authUrl) {
        window.location.assign(authUrl);
      } else {
        console.error("Google login initiation failed: No authUrl provided.");
        toast({
          title: "Error",
          description: "Google login could not be initiated.",
        });
      }
    } catch (error) {
      console.error("Error initiating Google login:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during Google login initiation.";
      toast({
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setGoogleLoading(false);
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
        <div className="flex flex-col justify-center mt-4">
        <Button className="" onClick={handleGoogleInit}>
            {googleLoading ? (
              <Lottie animationData={lottieLoader} loop={true} />
            ) : (
              <>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" style={{display: "block"}}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              &nbsp;Signup with Google
              </>
            )}
          </Button>
        </div>
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

