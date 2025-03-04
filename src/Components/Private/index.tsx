import { useContext, ReactNode } from "react";
import { authContext } from "../../context";
import { Navigate } from "react-router-dom";

type privateProps = {
  children: ReactNode;
};

export function Private({ children }: privateProps): any {
  const { signed } = useContext(authContext);
  if (!signed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
