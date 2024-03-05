import {useEffect} from "react"
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    socket?.on("newMessage", (message) => {
      const sound = new Audio(notificationSound);
      message.shouldShake = true;
      try {
        sound.play();
      } catch (error) {
        //toast.error(error.message)
        console.log("socket newMessage",error)
      }
      
      setMessages([...messages, message]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket]);
};

export default useListenMessages;
