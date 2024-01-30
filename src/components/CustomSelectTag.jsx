import { useState, useEffect, useRef } from "react";

const CustomSelectTag = ({
  options,
  onSelectItem,
  selectedValue,
  placeholder,
  labelName,
  inputName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedValue || '');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    onSelectItem(option);
    setIsOpen(false);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    onSelectItem(e.target.value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`select-container ${isOpen ? "open" : ""}`}>
      <div>
        <label htmlFor={inputName}>{!labelName && labelName}</label>
        <input
          type="text"
          className="select-input"
          placeholder={placeholder}
          value={selectedOption}
          onChange={handleSelectChange}
          onClick={toggleDropdown}
        />
        <img src="./images/arrow_down.png" alt="" />
      </div>
      {isOpen && (
        <div ref={dropdownRef} className="select-dropdown">
          {options.map((option, index) => (
            <div
              key={index}
              className="select-option"
              onClick={() => selectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelectTag;
