import "./Decision.scss";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrophy, FaArrowLeft } from "react-icons/fa";
import { resetState } from "../../redux/choices/choiceActions";
import Button from "../../components/Buttons/Button";

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
    <div className="decision-view h-100">
      <div className="row top-nav pt-3 px-3 m-0">
        <div className="col-10" />
        <div className="col-2">
          <button
            type="button"
            className="back-button d-flex justify-content-center align-items-center"
            onClick={handleNavigateBack}
            tabIndex={0}
            onKeyPress={handleNavigateBack}
            aria-label="go back"
          >
            <FaArrowLeft size={20} color="white" />
          </button>
        </div>
      </div>
      <div className="h-75 d-flex justify-content-center align-items-center animate__animated animate__fadeIn">
        <div className="p-2">
          <h3>
            {winners.length > 0
              ? winners.length > 1
                ? "Your top options are:"
                : "Your smart choice should be"
              : "Redirecting..."}
          </h3>
          <div className="d-flex justify-content-center">
            <div className="winner-list">
              {winners.map((ch_) => (
                <div className="p-3 text-left" key={ch_.id}>
                  <FaTrophy
                    color={winners.length > 1 ? "#b1bade" : "#f9bc4b"}
                    size={30}
                  />
                  <span className="px-3 font-bold">{ch_.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-3">
            {winners.length > 1 ? "May be go for a toss?" : "Wish you luck!"}
          </div>

          {winners.length > 1 && (
            <div className="mt-3">
              <Button name="Toss" onClick={handleToss} />
            </div>
          )}
          <div className="mt-5">
            <Button name="Save my choice" isDisabled />
            <Button name="Discard &amp; Start over" onClick={handleRestart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decision;
