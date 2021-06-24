import React, { useState, useMemo } from "react";
import "./AddCriteria.css";
import { useSelector, useDispatch } from "react-redux";
import {
  FaRegCheckCircle,
  FaRegCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import Slider from "@material-ui/core/Slider";
import withOverlay from "../../HOCs/WithOverlay/WithOverlay";
import Button from "../../components/Buttons/Button";
import { updateChoices } from "../../redux/choices/choiceActions";
import { SCORE_MARKS } from "../../Constants";

const AddCriteria = () => {
  const choices = useSelector((state) => state.choices);
  const dispatch = useDispatch();
  const [criteria, setCriteria] = useState("");
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

  const isAnyOptionSelected = useMemo(() => {
    return Object.keys(choiceScoreMap).some(
      (key) =>
        choiceScoreMap[key].isSelected &&
        choiceScoreMap[key].score !== undefined
    );
  }, [choiceScoreMap]);

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
        // eslint-disable-next-line no-nested-ternary
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
  };

  const onInputChange = (attr_) => {
    setCriteria(attr_.trimStart());
  };

  const onSelectionChange = (choiceId) => {
    const newObj = JSON.parse(JSON.stringify(choiceScoreMap));
    newObj[choiceId].isSelected = !newObj[choiceId].isSelected;
    newObj[choiceId].score = undefined;
    setChoiceScoreMap(newObj);
  };

  const handleSliderChange = (e, val, choiceId) => {
    // TODO: use debouncing
    // console.log(val, choiceId);
    const newObj = JSON.parse(JSON.stringify(choiceScoreMap));
    newObj[choiceId].score = val;
    setChoiceScoreMap(newObj);
  };
  return (
    <section
      role="button"
      tabIndex={-1}
      className="add-criteria p-2 position relative animate__animated animate__slideInUp"
      onClick={(e) => {
        e.stopPropagation();
      }}
      onKeyPress={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="display-body p-2">
        <label className="header pt-2 w-100 text-left" htmlFor="newAttr">
          What is your Criterion for judgement?
          {isAnyOptionSelected && criteria === "" ? (
            <p className="m-0 text-alert font-em-8">
              <FaExclamationCircle />
              &nbsp;This field is required
            </p>
          ) : (
            <p className="mt-2" />
          )}
          <input
            type="text"
            style={
              isAnyOptionSelected && criteria === ""
                ? { borderColor: "#de4653" }
                : {}
            }
            id="newAttr"
            className="w-100 p-2"
            value={criteria}
            placeholder="Your point goes here..."
            onChange={(e) => onInputChange(e.target.value)}
          />
        </label>

        <section>
          <p className="description pt-3 text-left">
            Select options to add this criteria and a score for each:
          </p>
          {choices &&
            choices.map((choice) => {
              return (
                <div
                  className={`option-group my-2 p-3 ${
                    choiceScoreMap[choice.id].isSelected
                      ? "expanded"
                      : "collapsed"
                  }`}
                  key={choice.id}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    className="d-flex justify-content-between"
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
                      <div className="d-flex justify-content-between">
                        <p id="discrete-slider">Score</p>{" "}
                        <p
                          className={
                            choiceScoreMap[choice.id].score === undefined
                              ? "text-alert"
                              : ""
                          }
                        >
                          {choiceScoreMap[choice.id].score !== undefined ? (
                            choiceScoreMap[choice.id].score
                          ) : (
                            <span>
                              <FaExclamationCircle />
                              {" not selected"}
                            </span>
                          )}
                        </p>
                      </div>
                      <Slider
                        defaultValue={0}
                        onChange={(e, val) =>
                          handleSliderChange(e, val, choice.id)
                        }
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
            })}
        </section>
      </div>
      <div className="bottom-nav p-2">
        <Button
          name="Add"
          type="rectangular"
          styles={{ backgroundColor: "#007a96" }}
          isDisabled={criteria === "" || !isAnyOptionSelected}
          onClick={handleAdd}
        />
      </div>
    </section>
  );
};

export default withOverlay(AddCriteria);
