import React from "react";
import { ReactNode } from "react";

interface IMessageProps {
  icon: ReactNode;
  text: string;
}

const Message = ({ icon, text }: IMessageProps) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="text-500">{icon}</span>
      <p className="text-500">{text}</p>
    </div>
  );
};

export default Message;
