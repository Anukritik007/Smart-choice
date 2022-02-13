import "./ChoiceDetails.scss";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "@material-ui/core/Slider";
import PropTypes from "prop-types";
import Button from "../Buttons/Button";
import Overlay from "../Overlay/Overlay";
import { SCORE_MARKS, CHOICE_DETAILS_CONTENT } from "../../Constants";
import { updateChoices } from "../../redux/choices/choiceActions";
import {
  mapScoreToProbabilities,
  updateLocalStorageWithCurrentState,
} from "../../utils/utils";

const ChoiceDetails = ({ choiceId, onBackdropClick }) => {
  const choices = useSelector((state) => state.choices);
  const activeChoice = useSelector((state) =>
    state.choices.find((choice) => choice.id === choiceId)
  );
  const [state, setState] = useState(activeChoice);
  const [allowEdit, setAllowEdit] = useState(false);
  const dispatch = useDispatch();

  const toggleAllowEdit = () => {
    setAllowEdit(!allowEdit);
  };

  const handleSliderChange = (e, val, attrId) => {
    // TODO: debounce
    const updatedAttr = state.attributes.map((attr) => {
      if (attr.id === attrId) {
        return { ...attr, score: val };
      }
      return attr;
    });
    const scoreSum = updatedAttr.reduce((acc, attr) => acc + attr.score, 0);
    setState({ ...state, attributes: updatedAttr, score: scoreSum });
  };

  const onAttrChange = (val, attrId) => {
    const updatedAttr = state.attributes.map((attr) => {
      if (attr.id === attrId) {
        return { ...attr, name: val };
      }
      return attr;
    });
    setState({ ...state, attributes: updatedAttr });
  };

  const handleUpdateAttributes = () => {
    const updatedChoices = choices.map((choice) =>
      choice.id === choiceId ? state : choice
    );
    const updatedProb = mapScoreToProbabilities(updatedChoices);
    dispatch(updateChoices(updatedProb));
    updateLocalStorageWithCurrentState(updatedProb);
    toggleAllowEdit();
  };

  return (
    <Overlay onBackdropClick={onBackdropClick}>
      <section
        role="presentation"
        className="choice-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyPress={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="choice-header">
          <h3 className="choice-name">{activeChoice.name}</h3>
          <h3 className="total-score">{activeChoice.score}</h3>
        </div>

        {allowEdit ? (
          <div className="display-body animate__animated animate__fadeIn">
            {state &&
              state.attributes.map((attr) => {
                return (
                  <div key={attr.id} className="criteria-info">
                    <input
                      type="text"
                      value={attr.name}
                      onChange={(e) => onAttrChange(e.target.value, attr.id)}
                    />
                    <Slider
                      key={`slider-${attr.id}`}
                      value={attr.score}
                      onChange={(e, val) => handleSliderChange(e, val, attr.id)}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="on"
                      // track="normal"
                      step={1}
                      marks={SCORE_MARKS}
                      min={-10}
                      max={10}
                    />
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="display-body">
            {activeChoice && activeChoice.attributes.length > 0 ? (
              activeChoice.attributes.map((attr) => (
                <div key={attr.id} className="criteria-row">
                  <div className="criteria-name">{attr.name}</div>
                  <div className="criteria-score">{attr.score}</div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>{CHOICE_DETAILS_CONTENT.EMPTY_STATE_INFO_TEXT}</p>
              </div>
            )}
          </div>
        )}

        <div className="button-wrapper">
          {activeChoice.attributes.length > 0 && (
            <Button
              name={
                allowEdit
                  ? CHOICE_DETAILS_CONTENT.UPDATE_BUTTON_TEXT
                  : CHOICE_DETAILS_CONTENT.EDIT_BUTTON_TEXT
              }
              shape="rectangular"
              styles={{ backgroundColor: "#007a96" }}
              onClick={allowEdit ? handleUpdateAttributes : toggleAllowEdit}
            />
          )}
        </div>
      </section>
    </Overlay>
  );
};

export default ChoiceDetails;

ChoiceDetails.propTypes = {
  choiceId: PropTypes.string.isRequired,
  onBackdropClick: PropTypes.func.isRequired,
};
