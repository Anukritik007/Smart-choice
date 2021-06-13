import React from "react";
import Button from "../../components/Buttons/Button";
// import { FaTrashAlt } from "react-icons/fa";

const ChoiceInput = ({
  value,
  placeholder,
  onInputChange,
  disableDelete,
  onInputDelete,
}) => {
  return (
    <div className="d-flex align-items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <div className="d-flex justify-content-center align-item-center w-25">
        {/* <FaTrashAlt onClick={onInputDelete}/> */}
        <Button
          name="X"
          type="rectangular"
          bgColor="red"
          isDisabled={disableDelete}
          onClick={onInputDelete}
        />
      </div>
    </div>
  );
};

export default ChoiceInput;
