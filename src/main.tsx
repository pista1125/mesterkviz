import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/devicePerformance";
import { installGlobalErrorHandlers } from "./lib/errorReporting";

installGlobalErrorHandlers();

createRoot(document.getElementById("root")!).render(<App />);
