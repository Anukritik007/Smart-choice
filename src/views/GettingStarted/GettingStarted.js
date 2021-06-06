import React, { useState } from "react";
import "./GettingStarted.css";
import Button from "../../components/Buttons/Button";
import { useHistory } from "react-router-dom";
import ChoiceInput from "./ChoiceInput";
import { useSelector, useDispatch } from "react-redux";
import { addChoice, updateQuestion } from "../../redux/choices/choiceActions";

const GettingStarted = () => {
  const history = useHistory();
  const [question, setQuestion] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const choiceList = useSelector((state) => state.choices);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const defaultVal_ = {
      attributes: [],
      score: 0,
      probability: "low",
    };
    const choice1 = {
      name: input1,
      ...defaultVal_,
    };
    const choice2 = {
      name: input2,
      ...defaultVal_,
    };
    console.log("submitted:", choice1);
    dispatch(addChoice(choice1));
    dispatch(addChoice(choice2));
    dispatch(updateQuestion(question));
    history.push("/");
  };

  const handleCancel = (event) => {
    console.log("Choice delete");
    setInput1("");
    setInput2("");
  };

  const handleAddMore = (event) => {
    console.log("Choice Add");
  };

  const updateChoice = () => {};
  const deleteChoice = () => {};

  return (
    <div className="getting-started">
      <section className="card shadow">
        <h2 style={{ paddingTop: "1.5em" }}>Add Choices:</h2>

        <form className="add-choices-form" onSubmit={handleSubmit}>
          <div className="form-elements">
            <section className="question">
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
              {choiceList.length === 0 ? (
                <>
                  <ChoiceInput
                    value={input1}
                    placeholder="Choice 1"
                    onInputChange={(val) => setInput1(val)}
                    onInputDelete={handleCancel}
                  />
                  <ChoiceInput
                    value={input2}
                    placeholder="Choice 2"
                    onInputChange={(val) => setInput2(val)}
                    onInputDelete={handleCancel}
                  />
                </>
              ) : (
                choiceList.map((choice) => {
                  return (
                    <ChoiceInput
                      value={choice.name}
                      placeholder="Choice x"
                      onInputChange={updateChoice}
                      onInputDelete={deleteChoice}
                    />
                  );
                })
              )}

              {/* Add more choices */}
              {input1 !== "" && input2 !== "" ? (
                <div className="d-flex justify-content-center align-item-center">
                  <Button name="+" type="circular" onClick={handleAddMore} />
                </div>
              ) : (
                ""
              )}
            </section>
          </div>

          <Button
            name="START"
            type="rectangular"
            role="submit"
            bgColor="green"
          />
        </form>
      </section>
    </div>
  );
};

export default GettingStarted;
