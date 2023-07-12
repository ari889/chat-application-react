const Input = ({ labelText, error = null, required = false, ...rest }) => {
    const { id, className } = rest || {};

    return (
        <>
            <label htmlFor={id} className="mb-2 block mt-3">{labelText ? labelText : 'Input Label'} {required && <span className="text-red-600">*</span>}</label>
            <input {...rest} className={`input-text ${error ? 'border-red-600' : 'border-gray-200'} ${error ? 'focus:border-red-700' : 'focus:border-gray-300'} ${className}`} />
            {error && <span className="text-red-600 mt-1 block">{error}</span>}
        </>
    )
}

export default Input