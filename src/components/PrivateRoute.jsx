import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useAuth();
    console.log({ isLoggedIn })

    return isLoggedIn ? children : <Navigate to="/" />
}

export default PrivateRoute