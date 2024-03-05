import React, { useRef, useEffect } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../../components/skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastDivRef = useRef();
  useListenMessages();

  useEffect(() => {
    setTimeout(() => {
      lastDivRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, i) => (
          <div
            key={message._id}
            ref={i == messages.length - 1 ? lastDivRef : null}
          >
            <Message message={message} />
          </div>
        ))}
      {loading &&
        [...Array(3)].map((_, indx) => <MessageSkeleton key={indx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
