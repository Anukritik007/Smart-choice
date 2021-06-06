import React from "react";
import "./Home.css";
import Button from "../../components/Buttons/Button";
import { useHistory } from "react-router-dom";

const Home = () => {
  const onNextClick = () => {
    history.push("/getting-started");
  };
  const history = useHistory();

  return (
    <div className="home">
      <section className="about card shadow">
        <h2>Welcome Fella</h2>
        <p className="guide-text">
          Confused with some choices ? We'll help you make the decision.
        </p>
        <p>
          {" "}
          When you know the reason why you are making a particular decision, it
          will better serve you in staying with it, and defending it.
        </p>
        <h3>Let's get started !!</h3>
        <div className="d-flex justify-content-center align-item-center">
          <Button name=">" type="circular" onClick={onNextClick} />
        </div>
      </section>
    </div>
  );
};

export default Home;
