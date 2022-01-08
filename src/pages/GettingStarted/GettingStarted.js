import "./GettingStarted.scss";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdAdd } from "react-icons/md";
import Button from "../../components/Buttons/Button";
import ChoiceInput from "./ChoiceInput";
import {
  updateChoices,
  updateQuestion,
} from "../../redux/choices/choiceActions";

const GettingStarted = () => {
  const history = useHistory();
  const choiceList = useSelector((state) => state.choices);
  const storedQuestion = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const [question, setQuestion] = useState(storedQuestion);
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
    const newChoices = [...addedChoices];
    newChoices.splice(
      newChoices.findIndex((choice_) => choice_.id === choiceId),
      1
    );
    setAddedChoices(newChoices);
  };

  const handleAddMore = () => {
    const newAdd = [...addedChoices];
    newAdd.push({
      id: generateId(),
      name: "",
      attributes: [],
      score: 0,
      probability: "medium", // TODO: calculate from utility
    });
    setAddedChoices(newAdd);
  };

  const handleChoiceChange = (e, choiceId) => {
    // TODO: debounce
    // console.log("handleChoiceChange", e, choiceId);
    const newChoices = addedChoices.map((choice) => {
      return choice.id === choiceId
        ? {
            ...choice,
            name: e.trimStart(),
          }
        : choice;
    });
    setAddedChoices(newChoices);
  };

  return (
    <div className="getting-started animate__animated animate__slideInRight">
      <section className="getting-started-card shadow">
        <form className="add-choices-form" onSubmit={handleSubmit}>
          <div className="form-elements">
            <section className="question pb-3">
              <label htmlFor="questionInput" className="m-0 w-100">
                What are you considering?
                <input
                  type="text"
                  autoComplete="off"
                  id="questionInput"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value.trimStart())}
                />
              </label>
              <p className="font-em-8 text-minor m-0">For example:</p>
              <ul className="hint-list text-minor font-em-8">
                <li>Which car should I buy?</li>
                <li>Which company should I join?</li>
                <li>Where to go on holiday?</li>
              </ul>
            </section>
            {/* inputing choices */}
            <section className="choices">
              <p className="m-0">What are the options?</p>
              {addedChoices.map((choice, index) => (
                <ChoiceInput
                  key={choice.id}
                  value={choice.name}
                  label={`Option ${index + 1}`}
                  disableDelete={addedChoices.length === 2}
                  placeholder=""
                  onInputChange={(e) => handleChoiceChange(e, choice.id)}
                  onInputDelete={() => handleChoiceDelete(choice.id)}
                />
              ))}

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
        </form>
      </section>
    </div>
  );
};

export default GettingStarted;
