import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ChoiceDetails.css";
import Button from "../../components/Buttons/Button";
import withOverlay from "../../HOCs/WithOverlay/WithOverlay";
import Slider from "@material-ui/core/Slider";
import { SCORE_MARKS } from "../../Constants";
import { updateChoices } from "../../redux/choices/choiceActions";
import { mapScoreToProbabilities } from "../../utils/utils";

const ChoiceDetails = ({ choiceId }) => {
  const allChoices_ = useSelector((state) => state.choices);
  const choice_ = useSelector((state) =>
    state.choices.find((choice) => choice.id === choiceId)
  );
  const [state, setstate] = useState(choice_);
  const [allowEdit, setAllowEdit] = useState(false);
  const dispatch = useDispatch();

  const toggleAllowEdit = () => {
    setAllowEdit(!allowEdit);
  };

  const handleSliderChange = (e, val, attrId) => {
    //TODO: debounce
    const updatedAttr_ = state.attributes.map((attr) => {
      if (attr.id === attrId) {
        return { ...attr, score: val };
      }
      return attr;
    });
    const scoreSum_ = updatedAttr_.reduce((acc, attr) => acc + attr.score, 0);
    setstate({ ...state, attributes: updatedAttr_, score: scoreSum_ });
  };

  const onAttrChange = (val, attrId) => {
    const new_ = state.attributes.map((attr) => {
      if (attr.id === attrId) {
        return { ...attr, name: val };
      }
      return attr;
    });
    setstate({ ...state, attributes: new_ });
  };

  const handleUpdateAttributes = () => {
    console.log("Updating attributes...");
    const allUpdatedChoices_ = allChoices_.map((choice) =>
      choice.id === choiceId ? state : choice
    );
    const updatedProb_ = mapScoreToProbabilities(allUpdatedChoices_);
    dispatch(updateChoices(updatedProb_));
    toggleAllowEdit();
  };

  return (
    <section
      className="content position-relative p-2"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="header p-2 d-flex justify-content-between align-items-center">
        <h3 className="m-0 text-left">{choice_.name}</h3>
        <h3 className="total-score m-0 d-flex justify-content-center align-items-center">
          {choice_.score}
        </h3>
      </div>

      {allowEdit ? (
        <div className="display-body p-2">
          {state &&
            state.attributes.map((attr) => {
              return (
                <div key={attr.id} className="card attribute-info p-2 my-4">
                  <input
                    type="text"
                    className="w-100 p-2"
                    value={attr.name}
                    onChange={(e) => onAttrChange(e.target.value, attr.id)}
                  />
                  <Slider
                    key={`slider-${attr.id}`}
                    value={attr.score}
                    onChange={(e, val) => handleSliderChange(e, val, attr.id)}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
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
          {choice_ && choice_.attributes.length > 0 ? (
            choice_.attributes.map((attr) => (
              <div key={attr.id} className="row">
                <div className="col-10 text-left">{attr.name}</div>
                <div className="col-2 p-0">{attr.score}</div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No points added yet.</p>
              <p>Click on "Add attribute" to add your points</p>
            </div>
          )}
        </div>
      )}

      <div className="bottom-nav">
        {choice_.attributes.length > 0 && (
          <Button
            name={allowEdit ? "Update" : "Edit"}
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
