import React, { useState } from "react";
import "./GettingStarted.css";
import Button from "../../components/Buttons/Button";
import { useHistory } from "react-router-dom";
import ChoiceInput from "./ChoiceInput";
import { useSelector, useDispatch } from "react-redux";
import {
  updateChoices,
  updateQuestion,
} from "../../redux/choices/choiceActions";
// import PerfectScrollbar from "react-perfect-scrollbar";

const GettingStarted = () => {
  const history = useHistory();
  const choiceList = useSelector((state) => state.choices);
  const question_ = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const [question, setQuestion] = useState(question_);
  const [addedChoices, setAddedChoices] = useState(choiceList);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateChoices(addedChoices));
    dispatch(updateQuestion(question));
    history.push("/dashboard");
  };

  const generateId = () => {
    return Date.now().toString();
  };

  const handleChoiceDelete = (choiceId) => {
    console.log("Choice delete");
    const newChoices_ = [...addedChoices];
    newChoices_.splice(
      newChoices_.findIndex((choice_) => choice_.id === choiceId),
      1
    );
    setAddedChoices(newChoices_);
  };

  const handleAddMore = () => {
    console.log("Add new Choice");
    const newAdd_ = [...addedChoices];
    newAdd_.push({
      id: generateId(),
      name: "",
      attributes: [],
      score: 0,
      probability: "medium", //TODO: calculate from utility
    });
    setAddedChoices(newAdd_);
  };

  const handleChoiceChange = (e, choiceId) => {
    //TODO: debounce
    // console.log("handleChoiceChange", e, choiceId);
    const newChoices_ = addedChoices.map((choice) => {
      return choice.id === choiceId
        ? {
            ...choice,
            name: e,
          }
        : choice;
    });
    setAddedChoices(newChoices_);
  };

  return (
    <div className="getting-started">
      <section className="card shadow">
        <h2 className="pt-5">Add Choices:</h2>
        <form className="add-choices-form" onSubmit={handleSubmit}>
          {/* <PerfectScrollbar> */}
          <div className="form-elements p-4">
            <section className="question pb-3">
              <label>What are you confused about?</label>
              <input
                type="text"
                placeholder="Like which organisation to join?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </section>
            {/* inputing choices */}
            <section className="choices">
              <label>Who are the contenders in your mind?</label>
              {addedChoices.map((choice, index) => {
                return (
                  <ChoiceInput
                    key={choice.id}
                    value={choice.name}
                    disableDelete={addedChoices.length === 2}
                    placeholder={`Choice ${index + 1}`}
                    onInputChange={(e) => handleChoiceChange(e, choice.id)}
                    onInputDelete={() => handleChoiceDelete(choice.id)}
                  />
                );
              })}

              {/* Add more choices */}
              {addedChoices.every((choice) => choice.name !== "") ? (
                <div className="d-flex justify-content-center align-item-center py-3">
                  <Button name="+" type="circular" onClick={handleAddMore} />
                </div>
              ) : (
                ""
              )}
            </section>
          </div>

          <Button
            name="PROCEED"
            type="rectangular"
            isDisabled={addedChoices.some((choice) => choice.name === "")}
            role="submit"
            bgColor="green"
          />
          {/* </PerfectScrollbar> */}
        </form>
      </section>
    </div>
  );
};

export default GettingStarted;
