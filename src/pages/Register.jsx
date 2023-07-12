import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../features/auth/authApi";
import Error from "../ui/Error";
import Input from "../components/form/Input";
import Password from "../components/form/Password";

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
                <Input labelText="Name" placeholder="Enter full name" onChange={handleOnChange} error={error?.name?.msg} value={form?.name} name="name" id="name" type="text" required disabled={isLoading} />

                <Input labelText="Email" placeholder="Enter valid email" onChange={handleOnChange} error={error?.email?.msg} value={form?.email} name="email" id="email" type="text" required disabled={isLoading} />

                <Password name="password" id="password" labelText="Password" placeholder="Valid password" onChange={handleOnChange} error={error?.password?.msg} value={form?.password} required toggle={toggle} togglePassword={togglePassword} disabled={isLoading} />

                <Input labelText="Confirm password" placeholder="Re-Enter password" onChange={handleOnChange} error={error?.passwordConfirmation?.msg} value={form?.passwordConfirmation} name="passwordConfirmation" id="passwordConfirmation" type="password" required disabled={isLoading} />

                <button type="submit" className="bg-blue-500 block mt-3 px-3 py-2 text-white font-semibold rounded-sm w-full disabled:bg-blue-200" disabled={isLoading}>Register</button>
            </form>
            <p className="text-dark mt-3">Already have an account? <Link to="/login" className="text-blue-500 font-semibold">Login</Link></p>
        </div>
    )
}

export default Register