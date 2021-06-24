/* eslint-disable no-nested-ternary */
import "./ScoreCard.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillXCircleFill } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import PropTypes, { element } from "prop-types";
import { deleteChoice } from "../../redux/choices/choiceActions";

/**
 * Component to create a card for choice with body content as passed in children
 * @param {*} { choiceId, height, width, showClose, children }
 */
const ScoreCard = ({
  choiceId,
  height,
  width,
  background,
  showClose,
  onClick,
  children,
}) => {
  const choices = useSelector((state) => state.choices);
  const dispatch = useDispatch();
  const [choiceInfo, setChoiceInfo] = useState(null);

  useEffect(() => {
    const current = choices.find((choice) => choice.id === choiceId);
    setChoiceInfo(current);
  }, [choices, choiceId]);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteChoice(choiceInfo.id));
  };

  return (
    <div
      role="button"
      className={`score-card shadow position-relative p-2 ${
        background === "success"
          ? "bg--success"
          : background === "warning"
          ? "bg--warning"
          : background === "danger"
          ? "bg--danger"
          : ""
      }`}
      style={{ height, width }}
      onClick={onClick}
      tabIndex={0}
      onKeyPress={onClick}
    >
      {showClose && (
        <div className="delete-choice position-absolute">
          <BsFillXCircleFill
            size={30}
            onClick={handleDelete}
            style={{ color: "#de4653", cursor: "pointer" }}
          />
        </div>
      )}
      {choiceInfo && (
        <div className="header pb-2 d-flex justify-content-between">
          <div className="text-left">
            {choiceInfo.name !== "" ? choiceInfo.name : "Add name"}
          </div>
          <div className="total-score d-flex justify-content-center align-items-center">
            {choiceInfo.score}
          </div>
        </div>
      )}
      <div className="body p-2">{children}</div>
    </div>
  );
};

export default ScoreCard;

ScoreCard.defaultProps = {
  height: "10em",
  width: "10em",
  background: "warning",
  showClose: true,
  onClick: () => {},
  children: [
    <p key="NA" className="text-disabled">
      <FaTasks size={30} />
    </p>,
  ],
};

ScoreCard.propTypes = {
  choiceId: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  background: PropTypes.oneOf(["success", "warning", "danger"]),
  showClose: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.arrayOf(element),
};
