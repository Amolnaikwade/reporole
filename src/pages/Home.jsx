import RepoInput from "../components/RepoInput";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="text-center mt-20 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
      >
        Analyze Your GitHub & Discover Your Role 🚀
      </motion.h1>

      <p className="text-gray-400 mt-4">
        Resume, No Form — Just Code
      </p>

      <RepoInput />
    </div>
  );
};

export default Home;