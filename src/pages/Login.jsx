import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Error from "../ui/Error"
import { useLoginMutation } from "../features/auth/authApi"
import Input from "../components/form/Input"
import Password from "../components/form/Password"

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
            setError(responseError.data.errors);
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
        login({
            email: form?.email,
            password: form?.password
        })
    }

    return (
        <div className="mt-5 rounded-md border-2 border-solid border-gray-200 w-[400px] mx-auto py-10 px-5">
            <h1 className="text-2xl font-semibold mb-5">Login</h1>
            {error?.common && <Error message={error?.common} />}
            <form onSubmit={handleOnSubmit}>
                <Input labelText="Email" placeholder="Enter email" onChange={handleOnChange} error={error?.email?.msg} value={form?.email} name="email" id="email" type="text" required className="mb-3" disabled={isLoading} />

                <Password name="password" id="password" labelText="Password" placeholder="Valid password" onChange={handleOnChange} error={error?.password?.msg} value={form?.password} required toggle={toggle} togglePassword={togglePassword} disabled={isLoading} />

                <button type="submit" className="bg-blue-500 block mt-3 px-3 py-2 text-white font-semibold rounded-sm w-full focus:outline-none disabled:bg-blue-400" disabled={isLoading}>Login</button>
            </form>
            <p className="text-dark mt-3">Have no account? <Link to="/register" className="text-blue-500 font-semibold">Register</Link></p>
        </div>
    )
}

export default Login