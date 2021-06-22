/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import "./GettingStarted.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdAdd } from "react-icons/md";
import Button from "../../components/Buttons/Button";
import ChoiceInput from "./ChoiceInput";
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
    const newChoices_ = [...addedChoices];
    newChoices_.splice(
      newChoices_.findIndex((choice_) => choice_.id === choiceId),
      1
    );
    setAddedChoices(newChoices_);
  };

  const handleAddMore = () => {
    const newAdd_ = [...addedChoices];
    newAdd_.push({
      id: generateId(),
      name: "",
      attributes: [],
      score: 0,
      probability: "medium", // TODO: calculate from utility
    });
    setAddedChoices(newAdd_);
  };

  const handleChoiceChange = (e, choiceId) => {
    // TODO: debounce
    // console.log("handleChoiceChange", e, choiceId);
    const newChoices_ = addedChoices.map((choice) => {
      return choice.id === choiceId
        ? {
            ...choice,
            name: e.trimStart(),
          }
        : choice;
    });
    setAddedChoices(newChoices_);
  };

  return (
    <div className="getting-started">
      <section className="card shadow">
        <form className="add-choices-form" onSubmit={handleSubmit}>
          {/* <PerfectScrollbar> */}
          <div className="form-elements pt-5 p-4">
            <section className="question pb-3">
              <label htmlFor="questionInput" className="pb-1 m-0">
                What are you considering?
                <input
                  type="text"
                  id="questionInput"
                  placeholder="Which company should I join?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value.trimStart())}
                />
              </label>
            </section>
            {/* inputing choices */}
            <section className="choices">
              <p className="m-0">What are the options?</p>
              {addedChoices.map((choice, index) => {
                return (
                  <ChoiceInput
                    key={choice.id}
                    value={choice.name}
                    disableDelete={addedChoices.length === 2}
                    placeholder={`Option ${index + 1}`}
                    onInputChange={(e) => handleChoiceChange(e, choice.id)}
                    onInputDelete={() => handleChoiceDelete(choice.id)}
                  />
                );
              })}

              {/* Add more choices */}
              {addedChoices.every((choice) => choice.name !== "") ? (
                <div className="d-flex justify-content-center py-3">
                  <button
                    type="button"
                    className="add-more-button border-0 d-flex justify-content-center align-items-center"
                    tabIndex={0}
                    aria-label="Add more options"
                    onClick={handleAddMore}
                    onKeyPress={handleAddMore}
                  >
                    <MdAdd color="white" size={30} />
                  </button>
                </div>
              ) : (
                ""
              )}
            </section>
          </div>

          <div className="pt-2 p-4">
            <Button
              name="Proceed"
              type="rectangular"
              isDisabled={addedChoices.some((choice) => choice.name === "")}
              action="submit"
              styles={{ backgroundColor: "#007a96" }}
            />
          </div>

          {/* </PerfectScrollbar> */}
        </form>
      </section>
    </div>
  );
};

export default GettingStarted;
