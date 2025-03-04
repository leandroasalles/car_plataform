import { Link } from "react-router-dom";

export function DashboardHeader() {
  return (
    <div className="w-full bg-red-600 rounded-lg flex items-center gap-4 p-2 text-white my-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/new">Novo Carro</Link>
    </div>
  );
}
