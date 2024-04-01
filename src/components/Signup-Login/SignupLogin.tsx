import { useState } from "react";
import { account, ID } from "../../lib/appwrite";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface User {
  name: string;
}

const SignupLogin = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

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
        <p className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
          {loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}
        </p>

        <form className="mt-8 space-y-3">
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
          <div className="flex items-center justify-between space-x-2">
            <Button
              className="w-full py-2 px-4 text-center bg-indigo-600 rounded-md text-white text-sm hover:bg-indigo-500"
              type="button"
              onClick={() => login(email, password)}>
              Login
            </Button>

            <Button
              className="w-full py-2 px-4 text-center bg-green-600 rounded-md text-white text-sm hover:bg-green-500"
              type="button"
              onClick={async () => {
                await account.create(ID.unique(), email, password, name);
                login(email, password);
              }}>
              Register
            </Button>

            <Button
              className="w-full py-2 px-4 text-center bg-red-600 rounded-md text-white text-sm hover:bg-red-500"
              type="button"
              onClick={async () => {
                await account.deleteSession("current");
                setLoggedInUser(null);
              }}>
              Logout
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupLogin;
