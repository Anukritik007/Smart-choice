import React from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { MdSend } from "react-icons/md";

const Home = () => {
  const onNextClick = () => {
    history.push("/getting-started");
  };
  const history = useHistory();

  return (
    <div className="home">
      <section className="about card shadow p-4">
        <h2 style={{ fontFamily: "Courgette" }}>Welcome Fella</h2>
        <article className="my-3">
          <p className="guide-text">
            Confused with some choices ? We'll help you make the decision.
          </p>
          <p>
            {" "}
            When you know the reason why you are making a particular decision,
            it will better serve you in staying with it, and defending it.
          </p>
        </article>
        <h3 className="pb-3" style={{ fontFamily: "Courgette" }}>
          Let's get started !!
        </h3>

        <div className="d-flex justify-content-center align-item-center">
          <div
            className="start-button d-flex justify-content-center align-items-center shadow"
            onClick={onNextClick}
          >
            <MdSend size={20} color="white" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
