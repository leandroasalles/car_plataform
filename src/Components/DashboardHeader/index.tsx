import { Link } from "react-router-dom";

export function DashboardHeader() {
  return (
    <div className="w-full bg-red-600 rounded-lg flex items-center gap-4 p-2 text-white my-4">
      <Link to="/dashboard" className="hover:underline decoration-white">
        Dashboard
      </Link>
      <Link to="/dashboard/new" className="hover:underline decoration-white">
        Novo Carro
      </Link>
    </div>
  );
}
