import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Error from "../ui/Error"
import { useLoginMutation } from "../features/auth/authApi"

const Login = () => {
    /**
     * form state
     */
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    /**
     * react router dom navigator
     */
    const navigate = useNavigate();

    /**
     * error state
     */
    const [error, setError] = useState("");

    /**
     * toggle password state
     */
    const [toggle, setToggle] = useState(true);

    /**
     * login response hook
     */
    const [login, { data, isLoading, error: responseError }] = useLoginMutation();

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
     * listen response error
     */
    useEffect(() => {
        if (responseError?.data) {
            setError(responseError.data);
        }

        if (data?.accessToken && data?.user) {
            navigate('/');
        }
    }, [responseError, data, navigate]);

    /**
     * form submit handler
     */
    const handleOnSubmit = (e) => {
        e.preventDefault();

        setError("");

        if (form?.login == '' && form?.register == '') {
            setError("Fill the form correctly!");
        } else {
            login({
                email: form?.email,
                password: form?.password
            })
        }
    }

    return (
        <div className="mt-5 rounded-md border-2 border-solid border-gray-200 w-[400px] mx-auto py-10 px-5">
            <h1 className="text-2xl font-semibold mb-5">Login</h1>
            {error && <Error message={error} />}
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="email" className="mb-2 block">Email <span className="text-red-600">*</span></label>
                <input type="text" onChange={handleOnChange} value={form.email} name="email" id="email" className="border border-solid border-gray-200 rounded-sm block w-full px-3 py-2 transition delay-75 focus:outline-0 focus:border-gray-300" />
                <label htmlFor="password" className="mb-2 block mt-3">Password <span className="text-red-600">*</span></label>
                <div className="relative">
                    <input type={toggle ? 'password' : 'text'} onChange={handleOnChange} value={form.password} name="password" id="password" className="border border-solid border-gray-200 rounded-sm block w-full px-3 py-2 transition delay-75 focus:outline-0 focus:border-gray-300" />
                    <FontAwesomeIcon icon={toggle ? faEye : faEyeSlash} className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" onClick={togglePassword} />
                </div>
                <button type="submit" className="bg-blue-500 block mt-3 px-3 py-2 text-white font-semibold rounded-sm w-full focus:outline-none">Login</button>
            </form>
            <p className="text-dark mt-3">Have no account? <Link to="/register" className="text-blue-500 font-semibold">Register</Link></p>
        </div>
    )
}

export default Login