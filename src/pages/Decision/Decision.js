import "./Decision.scss";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrophy, FaArrowLeft } from "react-icons/fa";
import { resetState } from "../../redux/choices/choiceActions";
import Button from "../../components/Buttons/Button";
import { DECISION_PAGE_CONTENT } from "../../Constants";

const Decision = () => {
  const history = useHistory();
  const choices = useSelector((state) => state.choices);
  const [winners, setWinners] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let maxScore = -Infinity;
    let leaders = [];
    choices.forEach((choice) => {
      if (choice.name && choice.score > maxScore) {
        leaders = [{ id: choice.id, name: choice.name }];
        maxScore = choice.score;
      } else if (choice.name && choice.score === maxScore) {
        leaders.push({ id: choice.id, name: choice.name });
      }
    });
    setWinners(leaders);
  }, [choices]);

  const handleNavigateBack = () => {
    history.push("/dashboard");
  };
  const handleRestart = () => {
    localStorage.clear();
    dispatch(resetState());
    history.push("/getting-started");
  };

  const handleToss = () => {
    const n = winners.length;
    const randomChoice = Math.floor(Math.random() * n); // returns random no. btwn 0 to n-1
    setWinners([winners[randomChoice]]);
  };

  return (
    <div className="decision-view">
      <div className="top-nav">
        <button
          type="button"
          className="back-button"
          onClick={handleNavigateBack}
          tabIndex={0}
          onKeyPress={handleNavigateBack}
          aria-label="go back"
        >
          <FaArrowLeft size={20} color="white" />
        </button>
      </div>
      <div className="decision-body animate__animated animate__fadeIn">
        <h3>
          {winners && winners.length > 1
            ? DECISION_PAGE_CONTENT.DRAW_MESSAGE
            : DECISION_PAGE_CONTENT.WINNER_MESSAGE}
        </h3>
        <div className="winner-list">
          {winners.map((winner) => (
            <div className="winner-item" key={winner.id}>
              <FaTrophy
                color={winners.length > 1 ? "#b1bade" : "#f9bc4b"}
                size={30}
              />
              <span>{winner.name}</span>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: "1rem" }}>
          {winners.length > 1
            ? DECISION_PAGE_CONTENT.TOSS_MESSAGE
            : DECISION_PAGE_CONTENT.WISH_MESSAGE}
        </div>

        {winners.length > 1 && (
          <div style={{ marginTop: "1rem" }}>
            <Button
              name={DECISION_PAGE_CONTENT.TOSS_BUTTON_TEXT}
              onClick={handleToss}
            />
          </div>
        )}
        <div className="buttons-wrapper">
          <Button name={DECISION_PAGE_CONTENT.SAVE_BUTTON_TEXT} isDisabled />
          <Button
            name={DECISION_PAGE_CONTENT.DISCARD_BUTTON_TEXT}
            onClick={handleRestart}
          />
        </div>
      </div>
    </div>
  );
};

export default Decision;
