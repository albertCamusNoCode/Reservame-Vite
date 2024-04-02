import { useState } from "react";
import { account } from "../../lib/appwrite";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import lottieLoader from "../../../public/lottie-loader.json";
import { useToast } from "@/components/ui/use-toast"; // Added for toast notification
interface User {
  name: string;
}

interface LoginProps {
  setShowLogin: (value: boolean) => void;
}

const Login = ({ setShowLogin }: LoginProps) => {
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast(); // Using toast

  async function login(email: string, password: string) {
    try {
      await account.createEmailSession(email, password);
      const user = await account.get();
      if (user) {
        setLoggedInUser(user as User);
        toast({
          title: "Success",
          description: "You are now logged in.",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
          Login
        </h2>
        <form
          className="mt-8 space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await login(email, password);
            setLoading(false);
          }}>
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
            onClick={() => setShowLogin(false)}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
