import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../features/auth/authApi";
import Error from "../ui/Error";

const Register = () => {
    /**
     * navogate user from react router dom
     */
    const navigate = useNavigate();

    /**
     * get register mutation
     */
    const [register, { data, isLoading, error: resposneError }] = useRegisterMutation();

    /**
     * form state
     */
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    /**
     * error state
     */
    const [error, setError] = useState("");

    /**
     * toggle password state
     */
    const [toggle, setToggle] = useState(true);

    /**
     * get response and redirect user to the inbox page
     */
    useEffect(() => {
        if (resposneError?.data) {
            setError(resposneError.data.errors);
        }

        if (data?.accessToken && data?.user) {
            navigate('/');
        }
    }, [data, resposneError, navigate]);

    /**
     * 
     * @param {*} e 
     * 
     * toggle password function
     */
    const togglePassword = (e) => {
        e.preventDefault();
        setToggle(prevState => !prevState);
    };

    /**
     * set form value on change
     */
    const handleOnChange = (e) => {
        e.preventDefault();

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    /**
     * submit registration
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        register({
            name: form?.name,
            email: form?.email,
            password: form?.password,
            passwordConfirmation: form?.passwordConfirmation
        });
    }
    return (
        <div className="mt-5 rounded-md border-2 border-solid border-gray-200 w-[400px] mx-auto py-10 px-5">
            <h1 className="text-2xl font-semibold mb-5">Register</h1>
            {error?.common && <Error message={error?.common} />}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="mb-2 block">Name <span className="text-red-600">*</span></label>
                <input type="text" onChange={handleOnChange} value={form.name} name="name" id="name" className={`border border-solid ${error?.name ? 'border-red-600' : 'border-gray-200'} rounded-sm block w-full px-3 py-2 transition delay-75 focus:outline-0 ${error?.name ? 'focus:border-red-700' : 'focus:border-gray-300'}`} />
                {error?.name && <span className="text-red-600 mt-1 block">{error?.name?.msg}</span>}
                <label htmlFor="email" className="mb-2 block mt-3">Email <span className="text-red-600">*</span></label>
                <input type="text" name="email" onChange={handleOnChange} value={form.email} id="email" className={`border border-solid ${error?.email ? 'border-red-600' : 'border-gray-200'} rounded-sm block w-full px-3 py-2 transition delay-75 focus:outline-0 ${error?.email ? 'focus:border-red-700' : 'focus:border-gray-300'}`} />
                {error?.email && <span className="text-red-600 mt-1 block">{error?.email?.msg}</span>}
                <label htmlFor="password" className="mb-2 block mt-3">Password <span className="text-red-600">*</span></label>
                <div className="relative">
                    <input type={toggle ? 'password' : 'text'} onChange={handleOnChange} value={form.password} name="password" id="password" className={`border border-solid ${error?.password ? 'border-red-600' : 'border-gray-200'} rounded-sm block w-full px-3 py-2 transition delay-75 focus:outline-0 ${error?.password ? 'focus:border-red-700' : 'focus:border-gray-300'}`} />
                    <FontAwesomeIcon icon={toggle ? faEye : faEyeSlash} className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" onClick={togglePassword} />
                </div>
                {error?.password && <span className="text-red-600 mt-1 block">{error?.password?.msg}</span>}
                <label htmlFor="passwordConfirmation" className="mb-2 block mt-3">Confirm Password <span className="text-red-600">*</span></label>
                <input type="password" onChange={handleOnChange} value={form.passwordConfirmation} name="passwordConfirmation" id="passwordConfirmation" className={`border border-solid ${error?.passwordConfirmation ? 'border-red-600' : 'border-gray-200'} rounded-sm block w-full px-3 py-2 transition delay-75 focus:outline-0 ${error?.passwordConfirmation ? 'focus:border-red-700' : 'focus:border-gray-300'}`} />
                {error?.passwordConfirmation && <span className="text-red-600 mt-1 block">{error?.passwordConfirmation?.msg}</span>}
                <button type="submit" className="bg-blue-500 block mt-3 px-3 py-2 text-white font-semibold rounded-sm w-full">Register</button>
            </form>
            <p className="text-dark mt-3">Already have an account? <Link to="/login" className="text-blue-500 font-semibold">Login</Link></p>
        </div>
    )
}

export default Register