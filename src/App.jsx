import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SampleRepos from "./components/SampleRepos";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import ComingSoon from "./components/ComingSoon";
import AboutUs from "./components/AboutUs";
import Dashboard from "./pages/Dashboard";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />

              <section id="samples">
                <SampleRepos />
              </section>

              <section id="features">
                <Features />
              </section>

              <ComingSoon />

              <section id="how">
                <HowItWorks />
              </section>

              <section id="about">
                <AboutUs />
              </section>
            </>
          }
        />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;