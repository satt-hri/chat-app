import { IoSearchSharp } from "react-icons/io5"

const SearchInput = () => {
  return (
    <div className="flex items-center gap-2">
        <input type="text" className="input input-bordered rounded-full" placeholder='Search…' />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
    </div>
  )
}

export default SearchInput