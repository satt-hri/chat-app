import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
import SearchInput from "./SearchInput"
import useGetConversations from "../../hooks/useGetConversations";

const Sidebar = () => {
  const { loading, conversations } = useGetConversations()
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
        <SearchInput  loading={loading} conversations={conversations}/>
        <div className='divider px-3'></div>
        <Conversations loading={loading} conversations={conversations} />
        <LogoutButton />
    </div>
  )
}

export default Sidebar