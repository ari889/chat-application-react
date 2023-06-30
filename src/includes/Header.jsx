import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../features/auth/authSlice';
import useAuth from '../hooks/useAuth';

const Header = () => {
    /**
     * get dispatch
     */
    const dispaatch = useDispatch();

    /**
     * is user logged in
     */
    const isUserLoggedIn = useAuth();

    /**
     * 
     * @param {*} e 
     * logout
     */
    const logout = (e) => {
        e.preventDefault();
        dispaatch(userLoggedOut());
        localStorage.removeItem(import.meta.env.VITE_APP_NAME);
    }

    return (
        <div className="bg-blue-500">
            <div className="mx-auto w-4/5">
                <div className="flex flex-row justify-between items-center py-3">
                    <Link to="/inbox">
                        <img className="w-10" src={logo} alt="" />
                    </Link>
                    <ul className="flex flex-row space-x-3 justify-end items-center">
                        {isUserLoggedIn ? (
                            <li><a href="#" onClick={logout} className="text-gray-300 font-semibold hover:text-white transition delay-75">Logout</a></li>
                        ) : (
                            <>
                                <li><NavLink to="/" className={({ isActive }) => isActive ? `text-white font-semibold hover:text-white transition delay-75` : `text-gray-300 font-semibold hover:text-white transition delay-75`}>Login</NavLink></li>
                                <li><NavLink to="/register" className={({ isActive }) => isActive ? `text-white font-semibold hover:text-white transition delay-75` : `text-gray-300 font-semibold hover:text-white transition delay-75`}>Register</NavLink></li>
                            </>
                        )}


                    </ul>
                </div>
            </div >
        </div >
    )
}

export default Header