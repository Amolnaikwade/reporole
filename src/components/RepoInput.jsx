import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const RepoInput = () => {
  const [repo, setRepo] = useState("");
  const [loading, setLoading] = useState(false); // ✅ added
  const navigate = useNavigate();

  const analyze = async () => {
    if (loading) return; // 🚫 prevent multiple clicks

    try {
      setLoading(true);

      const res = await axios.post("/analyze/roles", { repo });

      navigate("/dashboard", { state: res.data });
    } catch (err) {
      if (err.response?.status === 429) {
        alert("Too many requests 😅 Please wait a few seconds.");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 flex justify-center gap-2">
      <input
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        placeholder="owner/repo"
        className="px-4 py-3 rounded-lg bg-white/10 w-72 outline-none"
      />

      <button
        onClick={analyze}
        disabled={loading} // ✅ disable button
        className={`px-6 py-3 rounded-lg ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-blue-500"
        }`}
      >
        {loading ? "Analyzing..." : "Analyze 🚀"}
      </button>
    </div>
  );
};

export default RepoInput;