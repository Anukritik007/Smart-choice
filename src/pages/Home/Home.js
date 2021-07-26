import "./Home.scss";
import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
import { getTimeOfDay } from "../../utils/utils";

const Home = () => {
  const history = useHistory();
  const choices = useSelector((state) => state.choices);
  const [navigate, setNavigate] = useState(false);
  const [showNext, setshowNext] = useState(false);
  const steps = [
    "Put down your options & criteria",
    "Quantify impact of each criteria",
    "Arrive at a Smart choice",
  ];

  const hasStarted = useMemo(() => {
    return choices.every((_) => _.name);
  }, [choices]);

  useEffect(() => {
    if (!hasStarted) {
      setTimeout(() => {
        setshowNext(true);
      }, 4000);
    } else setshowNext(true);
  }, []);

  const onNextClick = () => {
    setNavigate(true);
    setTimeout(() => {
      history.push("/getting-started");
    }, 100);
  };

  return (
    <div
      className={`home row position relative animate__animated ${
        navigate ? "animate__slideOutLeft" : ""
      }`}
    >
      <section className="about shadow p-4">
        <h2 style={{ fontFamily: "Courgette" }}>{`${
          getTimeOfDay() === "Night" ? "Hey there" : `Good ${getTimeOfDay()}`
        }!`}</h2>
        <article className="my-4 text-left">
          <p>Are you confused with some choices? Smart-choice helps you</p>
          <div className="text-left">
            {steps.map((text, index) => (
              <p
                key={text}
                className={
                  hasStarted
                    ? "text-left"
                    : "text-left animate__animated animate__fadeIn"
                }
                style={{ animationDelay: `${index + 1}s` }}
              >
                <span className="step-circle">{index + 1}</span> &nbsp;{text}
              </p>
            ))}
          </div>
          {showNext && (
            <p
              className={hasStarted ? "" : "animate__animated animate__fadeIn"}
            >
              When you know the reason why you are making a particular decision,
              it will better serve you in staying with it, and defending it.
            </p>
          )}
        </article>

        {showNext && (
          <div className="d-flex justify-content-center align-item-center">
            <button
              type="button"
              className={
                hasStarted
                  ? "start-button"
                  : "start-button animate__animated animate__lightSpeedInLeft"
              }
              tabIndex={0}
              onClick={onNextClick}
              onKeyPress={onNextClick}
            >
              <p>
                {hasStarted ? "Continue with current" : "Let's get started"}
              </p>
              <MdSend size={20} color="white" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
