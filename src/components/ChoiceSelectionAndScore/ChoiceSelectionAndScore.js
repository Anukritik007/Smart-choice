import React from "react";
import "./ChoiceSelectionAndScore.scss";
import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";
import {
  FaRegCheckCircle,
  FaRegCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { SCORE_MARKS, ADD_CRITERIA_FORM } from "../../Constants";

const ChoiceSelectionAndScore = ({
  choice,
  choiceScoreMap,
  updateChoiceScoreMap,
}) => {
  const onSelectionChange = (choiceId) => {
    const newObj = JSON.parse(JSON.stringify(choiceScoreMap));
    newObj[choiceId].isSelected = !newObj[choiceId].isSelected;
    newObj[choiceId].score = undefined;
    updateChoiceScoreMap(newObj);
  };

  const handleSliderChange = (e, val, choiceId) => {
    // TODO: use debouncing
    // console.log(val, choiceId);
    const newObj = JSON.parse(JSON.stringify(choiceScoreMap));
    newObj[choiceId].score = val;
    updateChoiceScoreMap(newObj);
  };

  return (
    <div
      className={`option-group ${
        choiceScoreMap[choice.id].isSelected ? "expanded" : "collapsed"
      }`}
      key={choice.id}
    >
      <div
        role="button"
        tabIndex={0}
        className="custom-check-box"
        onClick={() => onSelectionChange(choice.id)}
        onKeyPress={() => onSelectionChange(choice.id)}
      >
        <p>{choice.name}</p>
        <div className="check-button">
          {choiceScoreMap[choice.id].isSelected ? (
            <FaRegCheckCircle size={30} color="#007a96" />
          ) : (
            <FaRegCircle size={30} color="#9fa9b9" />
          )}
        </div>
      </div>

      {choiceScoreMap[choice.id].isSelected && (
        <>
          <div className="selected-score">
            <p id="discrete-slider">{ADD_CRITERIA_FORM.SCORE}</p>
            <p
              className={
                choiceScoreMap[choice.id].score === undefined
                  ? "text-alert"
                  : ""
              }
            >
              {choiceScoreMap[choice.id].score !== undefined ? (
                <span>{choiceScoreMap[choice.id].score}</span>
              ) : (
                <span>
                  <FaExclamationCircle />
                  {ADD_CRITERIA_FORM.NOT_SELECTED_ERROR_TEXT}
                </span>
              )}
            </p>
          </div>
          <Slider
            defaultValue={0}
            onChange={(e, val) => handleSliderChange(e, val, choice.id)}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={SCORE_MARKS}
            min={-10}
            max={10}
          />
        </>
      )}
    </div>
  );
};

export default ChoiceSelectionAndScore;

ChoiceSelectionAndScore.propTypes = {
  choice: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
    probability: PropTypes.string,
  }).isRequired,
  choiceScoreMap: PropTypes.shape({
    isSelected: PropTypes.bool,
    score: PropTypes.number,
  }).isRequired,
  updateChoiceScoreMap: PropTypes.func.isRequired,
};
