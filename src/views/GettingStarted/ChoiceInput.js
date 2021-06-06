import React from "react";
import Button from "../../components/Buttons/Button";

const ChoiceInput = ({ value, placeholder, onInputChange, onInputDelete }) => {
  return (
    <div className="d-flex align-items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <div className="d-flex justify-content-center align-item-center w-25">
        <Button
          name="X"
          type="rectangular"
          bgColor="red"
          onClick={onInputDelete}
        />
      </div>
    </div>
  );
};

export default ChoiceInput;
