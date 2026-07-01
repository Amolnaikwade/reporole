import { useLocation } from "react-router-dom";
import RoleBarChart from "../components/charts/RoleBarChart";
import RolePieChart from "../components/charts/RolePieChart";

const Dashboard = () => {
  const { state } = useLocation();

  if (!state) {
    return <p className="text-center mt-10">No Data Available</p>;
  }

  const roles = state.roles;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard 📊</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {roles.map((role, i) => (
          <div key={i} className="bg-white/5 p-4 rounded-xl">
            <h2 className="text-sm text-gray-400">{role.name}</h2>
            <p className="text-xl font-bold">{role.score}%</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <RoleBarChart data={roles} />
        <RolePieChart data={roles} />
      </div>
    </div>
  );
};

export default Dashboard;