import "./Home.scss";
import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { MdSend, MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getTimeOfDay, isMobile } from "../../utils/utils";
import { resetState } from "../../redux/choices/choiceActions";
import { HOME_CONTENT } from "../../Constants";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const choices = useSelector((state) => state.choices);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [showNext, setshowNext] = useState(false);
  const { STEPS } = HOME_CONTENT;

  const isChoiceMakingInProgress = useMemo(() => {
    return choices.every((choice) => choice.name);
  }, [choices]);

  useEffect(() => {
    if (!isChoiceMakingInProgress) {
      setTimeout(() => {
        setshowNext(true);
      }, 4000);
    } else setshowNext(true);
  }, []);

  const onNextClick = () => {
    setExitAnimation(true);
    setTimeout(() => {
      history.push("/getting-started");
    }, 100);
  };

  const onDiscard = () => {
    localStorage.clear();
    dispatch(resetState());
    history.push("/getting-started");
  };

  return (
    <div
      className={`home animate__animated ${
        exitAnimation && isMobile ? "animate__slideOutLeft" : ""
      }`}
    >
      <section className="about">
        <h2>{`${
          getTimeOfDay() === "Night" ? "Hey there" : `Good ${getTimeOfDay()}`
        }!`}</h2>
        <div className="description">
          <p>{HOME_CONTENT.INTRO}</p>
          <div>
            {STEPS.map((text, index) => (
              <p
                key={text}
                className={
                  !isChoiceMakingInProgress
                    ? "animate__animated animate__fadeIn"
                    : ""
                }
                style={{ animationDelay: `${index + 1}s` }}
              >
                <span className="step-circle">{index + 1}</span>
                <span>{text}</span>
              </p>
            ))}
          </div>
          {showNext && (
            <p
              className={
                !isChoiceMakingInProgress
                  ? "animate__animated animate__fadeIn"
                  : ""
              }
            >
              {HOME_CONTENT.POSTSCRIPT}
            </p>
          )}
        </div>

        {showNext && (
          <div className="buttons-wrapper">
            <button
              type="button"
              className={
                isChoiceMakingInProgress
                  ? "home-action-button"
                  : "home-action-button animate__animated animate__lightSpeedInLeft"
              }
              tabIndex={0}
              onClick={onNextClick}
              onKeyPress={onNextClick}
            >
              <p>
                {isChoiceMakingInProgress
                  ? HOME_CONTENT.CONTINUE_BUTTON_TEXT
                  : HOME_CONTENT.START_BUTTON_TEXT}
              </p>
              <MdSend size={20} color="white" />
            </button>
            {isChoiceMakingInProgress && (
              <button
                type="button"
                className="home-action-button secondary"
                tabIndex={0}
                onClick={() => onDiscard()}
                onKeyPress={() => onDiscard()}
              >
                <p>Discard &amp; Start over</p>
                <MdDeleteForever size={20} color="white" />
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
