import { createRoot } from "react-dom/client";
import App from "./App"; // Import App from App.tsx
import "./tailwind.css";
import "@fontsource/inter";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container); // Create a root.
root.render(<App />);
