import React, { useState, useEffect } from "react";
import SignUpModal from "./SignUpModal";
import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(API.me, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user || data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkUser();
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
  try {
    await fetch(API.logout, {
      method: "GET",
      credentials: "include",
    });

    setUser(null);

    // ✅ Better than window.location
    navigate("/");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <>
      {/* ✅ Sticky + Glass Effect */}
      <div
        className="sticky top-0 z-50 w-full px-5 md:px-10 py-4 
      bg-[#f5f3ef]/70 backdrop-blur-md border-b border-white/20 
      flex items-center justify-between"
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center text-white font-bold">
            RR
          </div>
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            Repo<span className="text-purple-600">Role</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#samples">Samples</a>
          <a href="#about">About us</a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* ✅ Conditional Button (NO UI CHANGE) */}
          {user ? (
            <button
              onClick={handleLogout}
              className="hidden md:block bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-lg font-semibold shadow-md text-black"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="hidden md:block bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-lg font-semibold shadow-md text-black"
            >
              Sign up
            </button>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden text-3xl font-bold text-black"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="absolute top-16 left-0 w-full bg-white/90 backdrop-blur-md shadow-md flex flex-col items-center gap-5 py-6 md:hidden z-50">
            <a href="#features" className="text-black font-medium">
              Features
            </a>
            <a href="#how" className="text-black font-medium">
              How it works
            </a>
            <a href="#samples" className="text-black font-medium">
              Samples
            </a>
            <a href="#about" className="text-black font-medium">
              About us
            </a>

            {/* ✅ Mobile Conditional Button */}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold text-black"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowModal(true);
                  setOpen(false);
                }}
                className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold text-black"
              >
                Sign up
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && <SignUpModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;