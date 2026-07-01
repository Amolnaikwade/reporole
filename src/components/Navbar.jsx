import { useEffect, useState } from "react";
import { Code2, LogOut } from "lucide-react";

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
      await fetch("https://reposense.onrender.com/auth/logout", {
        method: "POST",
        credentials: "include", // 🔥 important
      });
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          "https://reposense.onrender.com/auth/me",
          {
            credentials: "include", // 🔥 MUST HAVE
          }
        );

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-white/5 backdrop-blur-md">
      <h1 className="text-xl font-bold text-purple-400">RepoRole</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : user ? (
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <img
            src={user.avatarUrl}
            alt="avatar"
            className="w-9 h-9 rounded-full border border-purple-500"
          />

          {/* Name */}
          <span className="text-white font-medium">
            {user.name || user.githubLogin}
          </span>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600"
          >
            <LogOut size={16} />
            Logout
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