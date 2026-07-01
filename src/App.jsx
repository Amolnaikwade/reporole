import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import { useEffect } from "react";

function App() {
   useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      console.log("TOKEN RECEIVED:", token); // debug

      localStorage.setItem("token", token);

      // remove token from URL
      window.history.replaceState({}, document.title, "/");
    }
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;