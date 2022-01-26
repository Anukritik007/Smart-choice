import "./ScoreCard.scss";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillXCircleFill, BsListTask } from "react-icons/bs";
import PropTypes, { element } from "prop-types";
import { deleteChoice } from "../../redux/choices/choiceActions";

/**
 * Component to create a card for choice with body content as passed in children
 * @param {*} { choiceId, height, width, showClose, children }
 */
const ScoreCard = ({ choiceId, background, showClose, onClick, children }) => {
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
      className={`score-card ${
        background === "success"
          ? "bg--success"
          : background === "warning"
          ? "bg--warning"
          : background === "danger"
          ? "bg--danger"
          : ""
      }`}
      // style={{ height, width }}
      onClick={onClick}
      tabIndex={0}
      onKeyPress={onClick}
    >
      {showClose && (
        <div className="delete-choice">
          <BsFillXCircleFill
            size={30}
            onClick={handleDelete}
            style={{ color: "#de4653", cursor: "pointer" }}
          />
        </div>
      )}
      {choiceInfo && (
        <div className="header">
          <div className="text-left">
            {choiceInfo.name !== "" ? choiceInfo.name : "Add name"}
          </div>
          <div className="total-score">{choiceInfo.score}</div>
        </div>
      )}
      <div className="score-card-body">{children}</div>
    </div>
  );
};

export default ScoreCard;

ScoreCard.defaultProps = {
  background: "warning",
  showClose: true,
  onClick: () => {},
  children: [
    <p key="NA" className="text-disabled">
      <BsListTask size={30} />
    </p>,
  ],
};

ScoreCard.propTypes = {
  choiceId: PropTypes.string.isRequired,
  background: PropTypes.oneOf(["success", "warning", "danger"]),
  showClose: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.arrayOf(element),
};
