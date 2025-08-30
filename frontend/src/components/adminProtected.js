import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user || (user.role !== "admin" && user.role !=="subadmin")) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;