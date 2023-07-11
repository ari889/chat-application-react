import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Search = () => {
    return (
        <form className="relative">
            <input type="text" className="focus:outline-none border rounded-[3px] border-gray-300 px-3 py-1 w-full" />
            <button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-300 absolute top-1/2 right-5 -translate-y-1/2" />
            </button>
        </form>
    )
}

export default Search