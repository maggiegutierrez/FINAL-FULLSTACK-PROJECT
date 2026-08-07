import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ isLoggedIn, isCheckingSession }) {
  if (isCheckingSession) return null; // En un pronto futuro, cuando mejore esta página, será un loading spinner
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isCheckingSession: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
