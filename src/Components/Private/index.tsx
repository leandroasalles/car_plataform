import { useContext, ReactNode } from "react";
import { authContext } from "../../context";
import { Navigate } from "react-router-dom";
import { Loading } from "../Loading";

type privateProps = {
  children: ReactNode;
};

export function Private({ children }: privateProps): any {
  const { signed, loading } = useContext(authContext);

  if (loading) {
    return <Loading />;
  }

  if (!signed) {
    console.log("Não está logado");
    return <Navigate to="/login" replace />;
  }

  return children;
}
