import { useState } from "react";
import { account, ID } from "./lib/appwrite";

interface User {
  name: string;
}

const App = () => {
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
    <div>
      <p>
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}
      </p>

      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="button" onClick={() => login(email, password)}>
          Login
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.create(ID.unique(), email, password, name);
            login(email, password);
          }}>
          Register
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.deleteSession("current");
            setLoggedInUser(null);
          }}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default App;
