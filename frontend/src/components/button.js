import React from 'react';

const CustomButton = ({ label, onClick, type = "button", className = "btn" }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButton;
