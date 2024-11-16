import { Navigate } from 'react-router-dom';
import { getLocalStorage } from './localStorage';

const PrivateRoute = ({ children }) => {

    const loggedIn = getLocalStorage('token');

    return loggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute; 