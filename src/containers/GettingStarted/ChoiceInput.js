import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const ChoiceInput = ({
  value,
  placeholder,
  label,
  onInputChange,
  disableDelete,
  onInputDelete,
}) => {
  return (
    <div className="py-1">
      <label
        className="choice-input-field font-em-8 text-minor"
        htmlFor="choiceInput"
      >
        {label}
        <input
          type="text"
          id="choiceInput"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </label>
      <div className="choice-input-delete">
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
  label: "",
  disableDelete: false,
};

ChoiceInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  disableDelete: PropTypes.bool,
  onInputDelete: PropTypes.func.isRequired,
};
