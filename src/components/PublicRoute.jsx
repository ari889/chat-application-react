import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const isLoggedIn = useAuth();
    console.log('public route', isLoggedIn)

    return !isLoggedIn ? children : <Navigate to="/inbox" />
}

export default PublicRoute