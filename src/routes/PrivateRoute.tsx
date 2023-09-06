// PrivateRoute.tsx

import { Navigate } from 'react-router-dom';
import { auth } from '../services/firebase';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {

  const token = localStorage.getItem('token');
  const user = auth.currentUser;

  return token && user ? element : <Navigate to="/connexion" />;

};

export default PrivateRoute;