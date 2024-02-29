import React from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map(() => (
        <Message />
      ))}
    </div>
  );
};

export default Messages;
