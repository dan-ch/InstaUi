import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "store";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  //   if (loading) {
  //     return <p>Checking authenticaton..</p>;
  //   }

  if (authenticated) {
    return children;
  }

  return <Navigate to="/signin" />;
};
