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
import Lottie from "lottie-react";
import lottieLoader from "../../../public/lottie-loader.json";
import { useToast } from "@/components/ui/use-toast"; // Added for toast notification
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // Separate state for Google login loader
  const { toast } = useToast(); // Using toast
  const navigate = useNavigate();
  const { login, initiateGoogleLogin } = useAuth(); // Destructure login and initiateGoogleLogin from useAuth

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      const { email, password } = values;
      const response = await login(email, password);
      if (response.authToken) {
        toast({
          title: "Success",
          description: "You are now logged in.",
        });
        navigate("/dashboard");
      } else {
        throw new Error("Login failed: Invalid email or password.");
      }
    } catch (error: unknown) {
      console.error("Login failed:", error);
      if (error instanceof z.ZodError) {
        const errorMessage = error.issues[0].message;
        toast({
          title: "Error",
          description: errorMessage,
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleInit = async () => {
    setGoogleLoading(true);
    try {
      const currentUrl = window.location.origin + "/oauth2/callback";
      const { authUrl } = await initiateGoogleLogin(currentUrl);
      if (authUrl) {
        window.location.href = authUrl;
      } else {
        console.error("Failed to initiate Google login: authUrl is empty.");
        toast({
          title: "Error",
          description: "Failed to initiate Google login.",
        });
        throw new Error("Failed to initiate Google login: authUrl is empty.");
      }
    } catch (error) {
      console.error("Google login initiation failed:", error);
      let errorMessage = "An unexpected error occurred.";
      if (typeof error === "object" && error !== null && 'message' in error) {
        errorMessage = (error as { message: string }).message;
      }
      toast({
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setGoogleLoading(false);
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
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {loading ? (
                <Lottie animationData={lottieLoader} loop={true} />
              ) : (
                "Login"
              )}
            </Button>
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
                  &nbsp;Login with Google
                </>
              )}
            </Button>
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
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
