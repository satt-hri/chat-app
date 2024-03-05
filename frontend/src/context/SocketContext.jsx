import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (authUser) {
      const tempsocket = io("http://localhost:8000", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(tempsocket);
      tempsocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    return () => socket?.close();
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
