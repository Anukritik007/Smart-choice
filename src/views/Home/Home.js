import React from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { useSelector } from "react-redux";

const Home = () => {
  const history = useHistory();
  const choices = useSelector((state) => state.choices);
  const onNextClick = () => {
    history.push("/getting-started");
  };

  return (
    <div className="home">
      <section className="about card shadow p-4">
        <h2 style={{ fontFamily: "Courgette" }}>Welcome Fella</h2>
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
            Let&apos;s get started !
          </h3>
        ) : (
          <h3 className="pb-3" style={{ fontFamily: "Courgette" }}>
            Continue with current
          </h3>
        )}

        <div className="d-flex justify-content-center align-item-center">
          <div
            className="start-button d-flex justify-content-center align-items-center shadow"
            role="button"
            tabIndex={0}
            onClick={onNextClick}
            onKeyPress={onNextClick}
          >
            <MdSend size={20} color="white" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
