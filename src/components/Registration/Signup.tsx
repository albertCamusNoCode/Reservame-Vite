import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { account, ID } from "../../lib/appwrite";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import lottieLoader from "../../../public/lottie-loader.json";
import { useToast } from "@/components/ui/use-toast"; // Added for toast notification
interface User {
  name: string;
}

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { toast } = useToast(); // Using toast
  const navigate = useNavigate(); // Corrected for navigation

  async function login(email: string, password: string) {
    await account.createEmailSession(email, password);
    const user = await account.get();
    if (user) {
      setLoggedInUser(user as User);
    }
  }

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
              await account.create(ID.unique(), email, password, name);
              await login(email, password);
              toast({
                title: "Success",
                description:
                  "Account created successfully. You are now logged in.",
              });
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
              navigate("/registration/login"); // Corrected navigation
            }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
