import React, { useState } from "react";
import "./AddAttribute.css";
import withOverlay from "../../HOCs/WithOverlay/WithOverlay";
import Button from "../../components/Buttons/Button";
import { useSelector, useDispatch } from "react-redux";
import { updateChoices } from "../../redux/choices/choiceActions";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import Slider from "@material-ui/core/Slider";
import { SCORE_MARKS } from "../../Constants";

const AddAttribute = () => {
  const choices = useSelector((state) => state.choices);
  const dispatch = useDispatch();
  const [attribute, setAttribute] = useState("");
  const [choiceScoreMap, setChoiceScoreMap] = useState(initialChoiceScoreMap);

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

  const handleAdd = () => {
    let updatedChoices_ = choices.map((choice) => {
      //add attribute to choices which are selected
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
      //find sum of all attributes score
      const totalScore_ = choice.attributes.reduce(
        (acc, curr) => acc + curr.score,
        0
      );
      delete choice.selected;
      return {
        ...choice,
        attributes: choice.attributes,
        score: totalScore_,
      };
    });
    let min = Infinity;
    let max = -Infinity;
    //find probability based on highest & lowest score choices
    updatedChoices_.forEach((choice) => {
      min = choice.score < min ? choice.score : min;
      max = choice.score > max ? choice.score : max;
    });
    const range_ = max - min;
    const mark1 = min + Math.floor(range_ / 3),
      mark2 = min + Math.floor(range_ / 3) * 2;
    console.log("range:,marks", range_, mark1, mark2);
    updatedChoices_ = updatedChoices_.map((choice) => {
      const probability_ =
        choice.score < mark1
          ? "low"
          : choice.score >= mark1 && choice.score <= mark2
          ? "medium"
          : "high";
      return {
        ...choice,
        probability: probability_,
      };
    });
    dispatch(updateChoices(updatedChoices_));
    setAttribute("");
    setChoiceScoreMap(initialChoiceScoreMap);
  };

  const onInputChange = (attr_) => {
    setAttribute(attr_);
  };

  const onSelectionChange = (choiceId_) => {
    const newObj_ = JSON.parse(JSON.stringify(choiceScoreMap));
    newObj_[choiceId_].isSelected = !newObj_[choiceId_].isSelected;
    setChoiceScoreMap(newObj_);
  };

  const handleSliderChange = (e, val, choiceId) => {
    //TODO: use debouncing
    // console.log(val, choiceId);
    const newObj_ = JSON.parse(JSON.stringify(choiceScoreMap));
    newObj_[choiceId].score = val;
    setChoiceScoreMap(newObj_);
  };
  return (
    <section
      className="add-attribute p-2"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h3 className="header">Add Attribute:</h3>
      <div className="display-body p-2">
        <input
          type="text"
          className="w-100 p-2"
          value={attribute}
          placeholder="Start typing..."
          onChange={(e) => onInputChange(e.target.value)}
        />
        <section>
          <p className="description">
            Against which choices would you add this?
          </p>
          {choices &&
            choices.map((choice) => {
              return (
                <div className="card m-2 p-3" key={choice.id}>
                  <div className="d-flex justify-content-between">
                    <p>{choice.name}</p>
                    <div
                      className="check-button"
                      onClick={() => onSelectionChange(choice.id)}
                    >
                      {choiceScoreMap[choice.id].isSelected ? (
                        <FaRegCheckCircle size={30} color="green" />
                      ) : (
                        <FaRegCircle size={30} color="grey" />
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
      <div className="bottom-nav">
        <Button
          name="Add"
          type="rectangular"
          bgColor="green"
          isDisabled={attribute === ""}
          onClick={handleAdd}
        />
      </div>
    </section>
  );
};

export default withOverlay(AddAttribute);
