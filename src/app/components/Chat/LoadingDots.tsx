import React from "react";

const LoadingDots: React.FC = () => {
  return (
    <div className="chat-message text-white p-3 rounded-lg max-w-2xl self-end dot-container">
      <div className="dot bg-white"></div>
      <div className="dot bg-white"></div>
      <div className="dot bg-white"></div>
    </div>
  );
};

export default LoadingDots;
