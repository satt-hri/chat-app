import { useState,useEffect} from "react";
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import { useAuthContext } from "../context/AuthContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate()
  const {authUser,setAuthUser} = useAuthContext()
  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true)
        const res = await fetch("api/user")
        const data = await res.json();

        if (data.error) {
            throw new Error(data.error)
        }
        setConversations(data)

      } catch (error) {
        toast.error(error.message)
        localStorage.removeItem("chat-user");
        setAuthUser(null)
        //navigate("/login")
      } finally {
        setLoading(false)
      }
    };
    if(authUser) getConversations()
  }, [authUser]);

  return { loading, conversations };
};

export default useGetConversations;
