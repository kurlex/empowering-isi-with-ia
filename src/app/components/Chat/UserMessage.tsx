import React from "react";

const UserMessage = ({ message }) => {
  return (
    <div className="chat-message text-white p-3 rounded-lg max-w-lg self-end ml-auto">
      {message}
    </div>
  );
};

export default UserMessage;
