import "./GettingStarted.scss";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdAdd } from "react-icons/md";
import Button from "../../components/Buttons/Button";
import ChoiceInput from "../../components/ChoiceInput/ChoiceInput";
import {
  updateChoices,
  updateQuestion,
} from "../../redux/choices/choiceActions";
import { updateLocalStorageWithCurrentState } from "../../utils/utils";
import { GETTING_STARTED_CONTENT } from "../../Constants";

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
    updateLocalStorageWithCurrentState(addedChoices, question);
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
      <section className="getting-started-card">
        <form className="add-choices-form" onSubmit={handleSubmit}>
          <div className="form-elements">
            <section className="question">
              <label htmlFor="questionInput">
                {GETTING_STARTED_CONTENT.QUESTION_LABEL}
                <input
                  type="text"
                  autoComplete="off"
                  id="questionInput"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value.trimStart())}
                />
              </label>
              <p className="text-minor">
                {GETTING_STARTED_CONTENT.FOR_EXAMPLE_TEXT}
              </p>
              <ul className="example-list text-minor">
                {GETTING_STARTED_CONTENT.QUESTION_EXAMPLES.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </section>
            {/* inputing choices */}
            <section className="choices">
              <p style={{ margin: 0 }}>
                {GETTING_STARTED_CONTENT.OPTIONS_LABEL}
              </p>
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
                <div className="add-more-wrapper">
                  <button
                    type="button"
                    className="add-more-button"
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

          <div className="submit-button-wrapper">
            <Button
              name={GETTING_STARTED_CONTENT.NEXT_BUTTON_TEXT}
              shape="rectangular"
              isDisabled={addedChoices.some((choice) => !choice.name)}
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
