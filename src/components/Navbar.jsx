import { Code2 } from "lucide-react";

const Navbar = () => {
  const login = () => {
    window.location.href =
      "https://reposense.onrender.com/auth/github?frontendUrl=" +
      window.location.origin;
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white/5 backdrop-blur-md">
      <h1 className="text-xl font-bold text-purple-400">RepoRole</h1>

      <button
        onClick={login}
        className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
      >
        <Code2 size={18} />
        Login
      </button>
    </div>
  );
};

export default Navbar;