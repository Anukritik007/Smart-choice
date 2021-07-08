import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const ChoiceInput = ({
  value,
  placeholder,
  onInputChange,
  disableDelete,
  onInputDelete,
}) => {
  return (
    <div className="d-flex align-items-center py-1">
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
          <FaTrashAlt size={25} color="#9fa9b9" />
        ) : (
          <FaTrashAlt size={25} color="#007a96" onClick={onInputDelete} />
        )}
      </div>
    </div>
  );
};

export default ChoiceInput;

ChoiceInput.defaultProps = {
  placeholder: "Start typing...",
  disableDelete: false,
};

ChoiceInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  disableDelete: PropTypes.bool,
  onInputDelete: PropTypes.func.isRequired,
};
