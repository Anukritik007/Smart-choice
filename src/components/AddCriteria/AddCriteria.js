import "./AddCriteria.scss";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { FaExclamationCircle } from "react-icons/fa";
import { updateChoices } from "../../redux/choices/choiceActions";
import { ADD_CRITERIA_FORM } from "../../Constants";
import { updateLocalStorageWithCurrentState } from "../../utils/utils";
import Overlay from "../Overlay/Overlay";
import Button from "../Buttons/Button";
import ChoiceSelectionAndScore from "../ChoiceSelectionAndScore/ChoiceSelectionAndScore";

const AddCriteria = ({ onBackdropClick }) => {
  const choices = useSelector((state) => state.choices);
  const dispatch = useDispatch();
  const infoTimer = useRef();
  const [criteria, setCriteria] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  function initialChoiceScoreMap() {
    const obj = {};
    choices.forEach((choice) => {
      obj[choice.id] = {
        isSelected: false,
        score: undefined,
      };
    });
    return obj;
  }
  const [choiceScoreMap, setChoiceScoreMap] = useState(initialChoiceScoreMap);

  useEffect(() => {
    return () => {
      clearTimeout(infoTimer.current);
    };
  });

  const isOptionSelectionsValid = useMemo(() => {
    let count = 0;
    // selection is valid if either no option selected or option selected along along with score
    const isSelectionsValid = Object.keys(choiceScoreMap).every((key) => {
      if (choiceScoreMap[key].isSelected) count += 1;
      return (
        !choiceScoreMap[key].isSelected ||
        (choiceScoreMap[key].isSelected &&
          choiceScoreMap[key].score !== undefined)
      );
    });
    // atleast one option should be selected along with selections being valid
    return isSelectionsValid && count > 0;
  }, [choiceScoreMap]);

  const showStatusMessage = () => {
    setStatusMessage(ADD_CRITERIA_FORM.ADD_SUCCESS_MESSAGE);
    infoTimer.current = setTimeout(() => {
      setStatusMessage("");
    }, 2000);
  };

  const handleAdd = () => {
    let updatedChoices = choices.map((choice) => {
      // add criteria to choices which are selected
      if (
        choiceScoreMap[choice.id].isSelected &&
        choiceScoreMap[choice.id].score !== undefined
      ) {
        choice.attributes.unshift({
          name: criteria,
          id: Date.now().toString(),
          score: choiceScoreMap[choice.id].score,
        });
      }
      // find sum of all attributes score
      const totalScore = choice.attributes.reduce(
        (acc, curr) => acc + curr.score,
        0
      );
      // eslint-disable-next-line no-param-reassign
      delete choice.selected;
      return {
        ...choice,
        attributes: choice.attributes,
        score: totalScore,
      };
    });
    let min = Infinity;
    let max = -Infinity;
    // find probability based on highest & lowest score choices
    updatedChoices.forEach((choice) => {
      min = choice.score < min ? choice.score : min;
      max = choice.score > max ? choice.score : max;
    });
    const range = max - min;
    const mark1 = min + Math.floor(range / 3);
    const mark2 = min + Math.floor(range / 3) * 2;

    updatedChoices = updatedChoices.map((choice) => {
      const probability =
        choice.score < mark1
          ? "low"
          : choice.score >= mark1 && choice.score <= mark2
          ? "medium"
          : "high";
      return {
        ...choice,
        probability,
      };
    });
    dispatch(updateChoices(updatedChoices));
    setCriteria("");
    setChoiceScoreMap(initialChoiceScoreMap);
    updateLocalStorageWithCurrentState(updatedChoices);
    showStatusMessage();
  };

  const onInputChange = (attr_) => {
    setCriteria(attr_.trimStart());
  };

  return (
    <Overlay onBackdropClick={onBackdropClick}>
      <section
        role="presentation"
        className="add-criteria animate__animated animate__slideInUp"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyPress={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="display-body">
          <label htmlFor="input-criteria">
            {ADD_CRITERIA_FORM.CRITERIA_INPUT_LABEL}
            {isOptionSelectionsValid && criteria === "" ? (
              <p className="text-alert font-em-8" style={{ margin: "0" }}>
                <FaExclamationCircle />
                {ADD_CRITERIA_FORM.FIELD_REQUIRED_ERROR_TEXT}
              </p>
            ) : (
              <p style={{ marginTop: "0.5rem" }} />
            )}
            <input
              type="text"
              autoComplete="off"
              style={
                isOptionSelectionsValid && criteria === ""
                  ? { borderColor: "#de4653" }
                  : {}
              }
              id="input-criteria"
              value={criteria}
              placeholder={ADD_CRITERIA_FORM.CRITERIA_INPUT_PLACEHOLDER}
              onChange={(e) => onInputChange(e.target.value)}
            />
          </label>

          <section>
            <p className="choice-label">
              {ADD_CRITERIA_FORM.CHOICE_SELECT_LABEL}
            </p>
            {choices &&
              choices.map((choice) => (
                <ChoiceSelectionAndScore
                  key={choice.id}
                  choice={choice}
                  choiceScoreMap={choiceScoreMap}
                  updateChoiceScoreMap={(newObj) => setChoiceScoreMap(newObj)}
                />
              ))}
          </section>
        </div>
        <div className="button-wrapper">
          <Button
            name={ADD_CRITERIA_FORM.ADD_BUTTON_NAME}
            shape="rectangular"
            styles={{ backgroundColor: "#007a96" }}
            isDisabled={criteria === "" || !isOptionSelectionsValid}
            onClick={handleAdd}
          />
        </div>
        <p className="text-success">{statusMessage}</p>
      </section>
    </Overlay>
  );
};

export default AddCriteria;

AddCriteria.propTypes = {
  onBackdropClick: PropTypes.func.isRequired,
};
