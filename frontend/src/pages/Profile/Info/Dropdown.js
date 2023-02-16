import React, { useState } from 'react';
import "./Dropdown.css";

const Dropdown = ({ options, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionChange(option);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption} <span className={`arrow ${isOpen ? 'up' : 'down'}`} />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option}
              className={option === selectedOption ? 'active' : ''}
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;