import React, { useState } from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
import { getTimeOfDay } from "../../utils/utils";

const Home = () => {
  const history = useHistory();
  const choices = useSelector((state) => state.choices);
  const [navigate, setNavigate] = useState(false);
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
      <div className="col-md-3 col-sm-0" />
      <section className="about col-md-6 col-sm-12 card shadow p-4">
        <h2 style={{ fontFamily: "Courgette" }}>{`Good ${getTimeOfDay()}`}</h2>
        <article className="my-3">
          <p className="guide-text">
            Confused with some choices ? We&apos;ll help you make the decision.
          </p>
          <p>
            When you know the reason why you are making a particular decision,
            it will better serve you in staying with it, and defending it.
          </p>
        </article>
        {choices.some((choice) => choice.name === "") ? (
          <h3 className="pb-3" style={{ fontFamily: "Courgette" }}>
            Let&apos;s get started!
          </h3>
        ) : (
          <h3 className="pb-3" style={{ fontFamily: "Courgette" }}>
            Continue with current
          </h3>
        )}

        <div className="d-flex justify-content-center align-item-center">
          <button
            type="button"
            className="start-button d-flex justify-content-center align-items-center"
            tabIndex={0}
            onClick={onNextClick}
            onKeyPress={onNextClick}
            aria-label="get started"
          >
            <MdSend size={20} color="white" />
          </button>
        </div>
      </section>
      <div className="col-md-3 col-sm-0" />
    </div>
  );
};

export default Home;
