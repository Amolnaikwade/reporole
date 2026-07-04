import React from "react";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { API } from "../utils/api";


const SignUpModal = ({ onClose }) => {

 const login = () => {
  console.log("LOGIN URL:", API.githubLogin); // 👈 DEBUG

  const redirect = `${window.location.origin}/dashboard`;

  window.location.href = `${API.githubLogin}?frontendUrl=${redirect}`;
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-[#f7f4ef] w-full max-w-md rounded-2xl shadow-xl p-6 md:p-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
          Sign Up
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Choose how you want to continue
        </p>

        <div className="mt-6 flex flex-col gap-4">
          
          <button
            onClick={login}
            className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 bg-[#f3f1ed] hover:bg-gray-200 text-black font-medium shadow-sm"
          >
            <FaGithub />
            Continue as Seeker (by GitHub)
          </button>

          <button className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 bg-[#f3f1ed] hover:bg-gray-200 text-black font-medium shadow-sm">
            <MdEmail />
            Continue as Recruiter (by email)
          </button>

        </div>
      </div>
    </div>
  );
};

export default SignUpModal;