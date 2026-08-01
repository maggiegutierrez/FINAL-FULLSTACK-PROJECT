import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ isLoggedIn }) {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
