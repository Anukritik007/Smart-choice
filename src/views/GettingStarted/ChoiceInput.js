import React from "react";
import { FaTrashAlt } from "react-icons/fa";

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
      <div
        className="d-flex justify-content-end align-item-center"
        style={{ width: "15%", cursor: "pointer" }}
      >
        {disableDelete ? (
          <FaTrashAlt size={25} color="grey" />
        ) : (
          <FaTrashAlt size={25} color="#de4653" onClick={onInputDelete} />
        )}
      </div>
    </div>
  );
};

export default ChoiceInput;
