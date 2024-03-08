import {useEffect} from "react"
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages,selectedConversation } = useConversation();
  useEffect(() => {
    socket?.on("newMessage", (message) => {
      if (selectedConversation?._id != message?.senderId) {
        return
      }
      const sound = new Audio(notificationSound);
      message.shouldShake = true;
      try {
        sound.play();
      } catch (error) {
        //toast.error(error.message)
        console.log("socket newMessage",error)
      }
      //debugger;
      setMessages([...messages, message,]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket,messages,selectedConversation]);
};

export default useListenMessages;
