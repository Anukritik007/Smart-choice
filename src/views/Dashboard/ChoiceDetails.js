import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ChoiceDetails.css";
import Slider from "@material-ui/core/Slider";
import PropTypes from "prop-types";
import Button from "../../components/Buttons/Button";
import withOverlay from "../../HOCs/WithOverlay/WithOverlay";
import { SCORE_MARKS } from "../../Constants";
import { updateChoices } from "../../redux/choices/choiceActions";
import { mapScoreToProbabilities } from "../../utils/utils";

const ChoiceDetails = ({ choiceId }) => {
  const choices = useSelector((state) => state.choices);
  const activeChoice = useSelector((state) =>
    state.choices.find((choice) => choice.id === choiceId)
  );
  const [state, setstate] = useState(activeChoice);
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
    setstate({ ...state, attributes: updatedAttr, score: scoreSum });
  };

  const onAttrChange = (val, attrId) => {
    const updatedAttr = state.attributes.map((attr) => {
      if (attr.id === attrId) {
        return { ...attr, name: val };
      }
      return attr;
    });
    setstate({ ...state, attributes: updatedAttr });
  };

  const handleUpdateAttributes = () => {
    const updatedChoices = choices.map((choice) =>
      choice.id === choiceId ? state : choice
    );
    const updatedProb = mapScoreToProbabilities(updatedChoices);
    dispatch(updateChoices(updatedProb));
    toggleAllowEdit();
  };

  return (
    // TODO: find better approach
    <section
      role="button"
      tabIndex={-1}
      className="choice-content position-relative p-2"
      onClick={(e) => {
        e.stopPropagation();
      }}
      onKeyPress={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="header p-2 d-flex justify-content-between align-items-center">
        <h3 className="m-0 text-left">{activeChoice.name}</h3>
        <h3 className="total-score m-0 d-flex justify-content-center align-items-center">
          {activeChoice.score}
        </h3>
      </div>

      {allowEdit ? (
        <div className="display-body p-2 animate__animated animate__fadeIn">
          {state &&
            state.attributes.map((attr) => {
              return (
                <div key={attr.id} className="attribute-info p-2 mb-4">
                  <input
                    type="text"
                    className="w-100 p-2 mb-4"
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
        <div className="display-body p-2">
          {activeChoice && activeChoice.attributes.length > 0 ? (
            activeChoice.attributes.map((attr) => (
              <div key={attr.id} className="row py-1">
                <div className="col-10 text-left">{attr.name}</div>
                <div className="col-2 p-0">{attr.score}</div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No points added yet.</p>
              <p>Click on &quot;Add attribute&quot; to add your points</p>
            </div>
          )}
        </div>
      )}

      <div className="bottom-nav p-2">
        {activeChoice.attributes.length > 0 && (
          <Button
            name={allowEdit ? "Update" : "Edit criteria"}
            type="rectangular"
            styles={{ backgroundColor: "#007a96" }}
            onClick={allowEdit ? handleUpdateAttributes : toggleAllowEdit}
          />
        )}
      </div>
    </section>
  );
};

export default withOverlay(ChoiceDetails);

ChoiceDetails.propTypes = {
  choiceId: PropTypes.string.isRequired,
};
