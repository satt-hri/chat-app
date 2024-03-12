import React, { useState,useEffect } from 'react'

import useConversation from  "../zustand/useConversation"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';

const useGetMessages = () => {
    const [loading,setLoading] =  useState(false)
    const {messages,setMessages,selectedConversation } = useConversation()
    const navigate = useNavigate()
    const {setAuthUser} = useAuthContext()

    useEffect(() => {
        const getMessages = async() =>{
            try {
                setLoading(true)
                //console.log("selectedConversation",selectedConversation)
                const res = await fetch(`/api/message/${selectedConversation._id}`)
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setMessages(data)
            } catch (error) {
                toast.error(error.message)
                localStorage.removeItem("chat-user");
                setAuthUser(null)
                //navigate("/login")
            }finally{
                setLoading(false)
            }
            
        } 

        if(selectedConversation?._id) getMessages()
    }, [selectedConversation?._id])
    

  return {messages,loading}
}

export default useGetMessages
