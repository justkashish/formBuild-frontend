
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ClipLoader from "react-spinners/ClipLoader";
import Dashboard from "./pages/Dashboard/Dashboard";
import FormEditor from "./pages/FormEditor/FormEditor";
import FormBot from "./pages/FormBot/FormBot";
import Submit from "./pages/Submit/Submit";
function App() {
  let baseURL;

  if(import.meta.env.VITE_API_STATUS === "DEVELOPMENT"){
    baseURL = "http://localhost:5000";
  }
  
  if(import.meta.env.VITE_API_STATUS === "PRODUCTION"){
    baseURL = import.meta.env.VITE_API_BASE_URL;
  }
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a backend health check or wake-up process
    const checkBackend = async () => {
      try {
        const response = await fetch(`${baseURL}/`);
        if (response.ok) {
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Checking Backend");
        console.error("Error check backend health:", error);
        setTimeout(checkBackend, 2000); // Retry every 2 seconds
      }
    };

    checkBackend();
  }, []);

  if (isLoading) {
    // Display loading screen while waiting
    return (
      <div className="loading-screen">
        <h1>Form Builder App</h1>
        <ClipLoader color="#ffffff" size={45} />
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        {/* Define routes for the login and home pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/editor/" element={<FormEditor />} />
        <Route path="/formbot" element={<FormBot/>}/>
        <Route path="/submit" element={<Submit/>}/>
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;