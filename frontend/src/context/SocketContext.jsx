import { createContext, useContext, useState,useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client"


export const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setONlineUsers] = useState([]);
  const {authUser} = useAuthContext()
  useEffect(() => {
    
    if (authUser) {
        try {
            const socket = io("http://localhost:8000")
            setSocket(socket)
        } catch (error) {
            console.log("socket error",error)
        }


         return () => socket?.close()
    }else{
        
    }

  }, [authUser])
  

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
