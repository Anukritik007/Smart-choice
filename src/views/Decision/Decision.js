import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Decision.css";
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
      if (choice.score > maxScore) {
        leaders = [{ id: choice.id, name: choice.name }];
        maxScore = choice.score;
      } else if (choice.score === maxScore) {
        leaders.push({ id: choice.id, name: choice.name });
      }
    });
    setWinners(leaders);
  }, [choices]);

  const handleNavigateBack = () => {
    history.push("/dashboard");
  };
  const handleRestart = () => {
    dispatch(resetState());
    history.push("/home");
  };

  return (
    <div className="decision-view h-100">
      <div className="row top-nav pt-2 px-2">
        <div className="col-10" />
        <div className="col-2">
          <button
            type="button"
            className="back-button d-flex justify-content-center align-items-center shadow"
            onClick={handleNavigateBack}
            tabIndex={0}
            onKeyPress={handleNavigateBack}
            aria-label="go back"
          >
            <FaArrowLeft size={20} color="white" />
          </button>
        </div>
      </div>
      <div className="h-75 d-flex justify-content-center align-items-center">
        <div className="p-2">
          <h3>Your smart choice should be</h3>
          <div className="d-flex justify-content-center">
            <div>
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
            {winners.length > 1
              ? "You still have contenders. Wanna go for a toss?"
              : "Wish you luck!"}
          </div>

          {winners.length > 1 && (
            <div className="bottom-nav mt-5">
              <Button name="Toss" />
            </div>
          )}
          <div className="bottom-nav mt-5">
            <Button name="Restart" onClick={handleRestart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decision;
