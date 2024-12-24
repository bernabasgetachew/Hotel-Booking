import {jwtDecode} from 'jwt-decode';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, role }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== role) return <Navigate to="/login" />;
    return <Component />;
  } catch (err) {
    localStorage.removeItem('token'); // Clear corrupted token
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
