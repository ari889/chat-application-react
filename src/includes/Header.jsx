import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <div className="bg-blue-500">
            <div className="mx-auto w-4/5">
                <div className="flex flex-row justify-between items-center py-3">
                    <Link to="/">
                        <img className="w-10" src={logo} alt="" />
                    </Link>
                    <ul className="flex flex-row space-x-3 justify-end items-center">
                        <li><NavLink to="/login" className={({ isActive }) => isActive ? `text-white font-semibold hover:text-white transition delay-75` : `text-gray-300 font-semibold hover:text-white transition delay-75`}>Login</NavLink></li>
                        <li><NavLink to="/register" className={({ isActive }) => isActive ? `text-white font-semibold hover:text-white transition delay-75` : `text-gray-300 font-semibold hover:text-white transition delay-75`}>Register</NavLink></li>
                        <li><a href="#" className="text-gray-300 font-semibold hover:text-white transition delay-75">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header