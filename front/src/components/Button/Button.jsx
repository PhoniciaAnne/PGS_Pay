import React from 'react';
import './Button.css';

const Button = ({ children, onClick, type = 'button', disabled = false }) => {
  return (
    <button className="custom-btn" type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
