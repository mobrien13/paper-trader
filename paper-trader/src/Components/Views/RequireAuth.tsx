import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../firebase.js";

export function RequireAuth({ children }: { children: JSX.Element }) {
  let user = useAuth();
  let location = useLocation();

  if (user===null) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
}