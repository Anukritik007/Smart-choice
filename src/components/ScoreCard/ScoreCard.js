import "./ScoreCard.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillXCircleFill } from "react-icons/bs";
import PropTypes from "prop-types";
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
    console.log("useEffect");
    const current = choices.find((choice) => choice.id === choiceId);
    setChoiceInfo(current);
  }, [choices, choiceId]);

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log("deleting:", choiceInfo.name);
    dispatch(deleteChoice(choiceInfo.id));
  };

  return (
    <div
      className={`score-card shadow card position-relative p-2 ${
        background === "success"
          ? "bg--success"
          : background === "warning"
          ? "bg--warning"
          : background === "danger"
          ? "bg--danger"
          : ""
      }`}
      style={{ height: height, width: width }}
      onClick={onClick}
    >
      {showClose && (
        <div className="delete-choice position-absolute">
          <BsFillXCircleFill
            size={30}
            onClick={handleDelete}
            style={{ color: "red", cursor: "pointer" }}
          />
        </div>
      )}
      {choiceInfo && (
        <div className="header py-2 d-flex justify-content-between">
          <div>{choiceInfo.name !== "" ? choiceInfo.name : "Add name"}</div>
          <div className="total-score">{choiceInfo.score}</div>
        </div>
      )}
      <div className="body p-2">{children ? children : "Nothing to show"}</div>
    </div>
  );
};

export default ScoreCard;

ScoreCard.defaultProps = {
  height: "10em",
  width: "10em",
  showClose: true,
};

ScoreCard.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  background: PropTypes.oneOf(["success", "warning", "danger"]),
};
