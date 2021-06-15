import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import { useSelector, useDispatch } from "react-redux";
import "./Decision.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { resetState } from "../../redux/choices/choiceActions";

const Decision = () => {
  const history = useHistory();
  const choices = useSelector((state) => state.choices);
  const [winners, setWinners] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let max_ = -Infinity;
    let winners_ = [];
    for (const choice of choices) {
      if (choice.score > max_) {
        winners_ = [choice.name];
        max_ = choice.score;
      } else if (choice.score === max_) {
        winners_.push(choice.name);
      }
    }
    setWinners(winners_);
  }, [choices]);

  const handleNavigateBack = () => {
    history.push("/dashboard");
  };
  const handleRestart = () => {
    dispatch(resetState());
    history.push("/home");
  };

  return (
    <div className="decision-view h-100 d-flex align-items-center justify-content-center">
      <div className="body">
        <h3>Your points are in favour of</h3>
        {winners.map((ch_, index_) => (
          <div className="p-3" key={index_}>
            <FaRegCheckCircle color="green" />
            <span>{ch_}</span>
          </div>
        ))}
        {winners.length > 1 ? (
          <div>You still have contenders. Wanna go for a toss?</div>
        ) : (
          <div>Wish you luck!</div>
        )}
        <div className="bottom-nav mt-5">
          <Button name="Back" onClick={handleNavigateBack} />
        </div>
        <div className="bottom-nav mt-5">
          <Button name="Restart" onClick={handleRestart} />
        </div>
      </div>
    </div>
  );
};

export default Decision;
