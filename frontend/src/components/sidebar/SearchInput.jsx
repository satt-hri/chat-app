import { IoSearchSharp } from "react-icons/io5"
import {useState} from 'React';
import useGetConversations from '../../hooks/useGetConversations'
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search,setSearch] = useState("")
  const {conversations} = useGetConversations()
  const { setSelectedConversation } = useConversation();
  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!search) {
      return 
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
    if (conversation) {
      setSelectedConversation(conversation)
    }else toast.error("can not find conversation")

  }
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <input type="text" className="input input-bordered rounded-full" placeholder='Search…' value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}

export default SearchInput