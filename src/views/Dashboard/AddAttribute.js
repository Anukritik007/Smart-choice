import React, { useState } from "react";
import "./AddAttribute.css";
import { useSelector, useDispatch } from "react-redux";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import Slider from "@material-ui/core/Slider";
import withOverlay from "../../HOCs/WithOverlay/WithOverlay";
import Button from "../../components/Buttons/Button";
import { updateChoices } from "../../redux/choices/choiceActions";
import { SCORE_MARKS } from "../../Constants";

const AddAttribute = () => {
  const choices = useSelector((state) => state.choices);
  const dispatch = useDispatch();
  const [attribute, setAttribute] = useState("");
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

  const handleAdd = () => {
    let updatedChoices = choices.map((choice) => {
      // add attribute to choices which are selected
      if (
        choiceScoreMap[choice.id].isSelected &&
        choiceScoreMap[choice.id].score !== undefined
      ) {
        choice.attributes.push({
          name: attribute,
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
    setAttribute("");
    setChoiceScoreMap(initialChoiceScoreMap);
  };

  const onInputChange = (attr_) => {
    setAttribute(attr_.trimStart());
  };

  const onSelectionChange = (choiceId) => {
    const newObj = JSON.parse(JSON.stringify(choiceScoreMap));
    newObj[choiceId].isSelected = !newObj[choiceId].isSelected;
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
      className="add-attribute p-2"
      onClick={(e) => {
        e.stopPropagation();
      }}
      onKeyPress={(e) => {
        e.stopPropagation();
      }}
    >
      <h3 className="header py-2">Add Attribute</h3>
      <div className="display-body p-2">
        <input
          type="text"
          className="w-100 p-2"
          value={attribute}
          placeholder="Your point goes here..."
          onChange={(e) => onInputChange(e.target.value)}
        />
        <section>
          <p className="description pt-3 text-left">
            Select choices to add this to and provide a score:
          </p>
          {choices &&
            choices.map((choice) => {
              return (
                <div className="card my-2 p-3" key={choice.id}>
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
                    <div>
                      <div className="d-flex justify-content-between">
                        <p>Score</p> <p>{choiceScoreMap[choice.id].score}</p>
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
                    </div>
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
          isDisabled={attribute === ""}
          onClick={handleAdd}
        />
      </div>
    </section>
  );
};

export default withOverlay(AddAttribute);
