import { Code2, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = () => {
    window.location.href =
      "https://reposense.onrender.com/auth/github?frontendUrl=" +
      window.location.origin;
  };

  const logout = async () => {
    try {
      await axios.post(
        "https://reposense.onrender.com/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (err) {
      console.log("Logout failed");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://reposense.onrender.com/auth/me",
          {
            withCredentials: true, // ✅ CRITICAL
          }
        );

        console.log("USER:", res.data);
        setUser(res.data.user);
      } catch (err) {
        console.log("Not logged in");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white/5 backdrop-blur-md">
      
      <h1 className="text-xl font-bold text-purple-400 flex items-center gap-2">
        <Code2 /> RepoRole
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : user ? (
        <div className="flex items-center gap-4">
          
          {/* Avatar */}
          <img
            src={user.avatar_url}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />

          {/* Username */}
          <span className="text-white font-medium">
            {user.login}
          </span>

          {/* Logout */}
          <button
            onClick={logout}
            className="bg-red-500/20 px-3 py-1 rounded hover:bg-red-500/40"
          >
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={login}
          className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Code2 size={18} />
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;