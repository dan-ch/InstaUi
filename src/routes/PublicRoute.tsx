import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "store";


interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  if (authenticated) {
    return <Navigate to="/home" />;
  }

  return children;
};
