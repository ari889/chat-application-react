import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Password = ({ labelText, toggle, togglePassword, error = null, required = false, ...rest }) => {
    const { id, className } = rest || {};

    return (
        <>
            <label htmlFor={id} className="mb-2 block mt-3">{labelText ? labelText : 'Input Label'} {required && <span className="text-red-600">*</span>}</label>
            <div className="relative">
                <input type={toggle ? 'password' : 'text'} {...rest} className={`input-text ${error ? 'border-red-600' : 'border-gray-200'} ${error ? 'focus:border-red-700' : 'focus:border-gray-300'} ${className}`} />
                <FontAwesomeIcon icon={toggle ? faEye : faEyeSlash} className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" onClick={togglePassword} />
            </div>
            {error && <span className="text-red-600 mt-1 block">{error}</span>}
        </>
    )
}

export default Password