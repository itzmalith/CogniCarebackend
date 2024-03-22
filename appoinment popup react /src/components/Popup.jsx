import React from 'react';

const Popup = ({ onClose }) => {
  const count = 2; // Number of boxes to display

  const deleteBox = index => {
    console.log(`Delete box ${index + 1}`);
    // Add your delete logic here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg w-3/4 h-3/4">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">My Appointments</h2>
          <button className="text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="overflow-y-auto bg-gray-100 h-3/4 p-4 rounded-lg">
          {/* Scrollable content area */}
          {[...Array(count)].map((_, index) => (
            <div key={index} className="flex flex-col mb-4 bg-white rounded-lg p-2 shadow-md">
              <div className="text-lg font-semibold mb-2">Doctor Name</div>
              <div className="flex mb-1">
                <span className="font-semibold mr-1">Date:</span>
                <span>[Date]</span>
              </div>
              <div className="flex mb-1">
                <span className="font-semibold mr-1">Time:</span>
                <span>[Time]</span>
              </div>
              <p className="text-sm">Special Notes: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.</p>
              <button className="text-red-500 mt-2" onClick={() => deleteBox(index)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Popup;
