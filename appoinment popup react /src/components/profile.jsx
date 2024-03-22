// Button.js
import React, { useState } from 'react';
import Popup from './Popup';

const Button = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  }

  return (
    <div>
      <button
        onClick={togglePopup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xl"
      >
        Click me
      </button>
      {showPopup && <Popup onClose={togglePopup} />}
    </div>
  );
}

export default Button;
