import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-[#f5f3ef] min-h-screen">

      <div className="flex flex-col items-center justify-center text-center mt-16 md:mt-24 px-4">
        
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900">
          RepoRole
        </h1>

        {/* Subtitle */}
        <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-xl">
          No Resume, No form, Just Code → Roles
        </p>

        {/* Input Section */}
        <div className="mt-8 md:mt-10 w-full max-w-2xl flex flex-col sm:flex-row items-center gap-4">
          
          <input
            type="text"
            placeholder="https://github.com/username/repo"
            className="w-full px-5 py-3 md:py-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none"
          />

          
        <button className="bg-yellow-500 hover:bg-yellow-400 px-8 py-4 rounded-xl text-lg font-medium shadow-md text-black w-[200px]">
          Analyze →
        </button>

        </div>
      </div>
    </div>
  );
};

export default Home;