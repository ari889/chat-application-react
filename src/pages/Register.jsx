import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom"

const Register = () => {
    const [toggle, setToggle] = useState(true);

    const togglePassword = (e) => {
        e.preventDefault();
        setToggle(prevState => !prevState);
    };
    return (
        <div className="mt-5 rounded-md border-2 border-solid border-gray-200 w-[400px] mx-auto py-10 px-5">
            <h1 className="text-2xl font-semibold mb-5">Register</h1>
            <form action="">
                <label htmlFor="name" className="mb-2 block">Name <span className="text-red-600">*</span></label>
                <input type="text" name="name" id="name" className="border border-solid border-gray-200 rounded-sm block w-full px-3 py-2 transition delay-75 focus:outline-0 focus:border-gray-300" />
                <label htmlFor="email" className="mb-2 block mt-3">Email <span className="text-red-600">*</span></label>
                <input type="text" name="email" id="email" className="border border-solid border-gray-200 rounded-sm block w-full px-3 py-2 transition delay-75 focus:outline-0 focus:border-gray-300" />
                <label htmlFor="password" className="mb-2 block mt-3">Password <span className="text-red-600">*</span></label>
                <div className="relative">
                    <input type={toggle ? 'password' : 'text'} name="password" id="password" className="border border-solid border-gray-200 rounded-sm block w-full px-3 py-2 transition delay-75 focus:outline-0 focus:border-gray-300" />
                    <FontAwesomeIcon icon={toggle ? faEye : faEyeSlash} className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" onClick={togglePassword} />
                </div>
                <label htmlFor="passwordConfirmation" className="mb-2 block mt-3">Confirm Password <span className="text-red-600">*</span></label>
                <input type="password" name="passwordConfirmation" id="passwordConfirmation" className="border border-solid border-gray-200 rounded-sm block w-full px-3 py-2 transition delay-75 focus:outline-0 focus:border-gray-300" />
                <button type="submit" className="bg-blue-500 block mt-3 px-3 py-2 text-white font-semibold rounded-sm w-full">Register</button>
            </form>
            <p className="text-dark mt-3">Already have an account? <Link to="/login" className="text-blue-500 font-semibold">Login</Link></p>
        </div>
    )
}

export default Register