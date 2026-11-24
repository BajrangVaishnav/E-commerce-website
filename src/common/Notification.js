import React from "react";

const Notification = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div>{children}</div>
      <button
        onClick={onClose}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
  );
};

export default Notification;
