import React from "react";
import Button from "../../components/Buttons/Button";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import ScoreCard from "../../components/ScoreCard/ScoreCard";

const Dashboard = () => {
  const history = useHistory();
  const choices = useSelector((state) => state.choices);

  const handleNavigateBack = () => {
    history.push("/getting-started");
  };

  const getCardContent = (attributes) => {
    let jsx_;
    if (attributes.length > 0) {
      jsx_ = attributes.map((attr) => {
        return (
          <div key={attr.id} className="d-flex justify-content-between">
            <p>{attr.name}</p>
            <p>{attr.score}</p>
          </div>
        );
      });
    }
    return jsx_;
  };

  const mapProbabilityToBackground = (probability_) => {
    switch (probability_) {
      case "low":
        return "danger";
      case "medium":
        return "warning";
      case "high":
        return "success";
      default:
        return "";
    }
  };

  const handleCardClick = (id_) => {
    console.log("Card clicked:", id_);
  };

  const handleAddAttribute = () => {};
  const handleProceed = () => {
    history.push("/decision");
  };

  return (
    <div className="dashboard h-100 p-3">
      <div className="top-nav">
        <Button name="Back" onClick={handleNavigateBack} />
      </div>
      <div className="body row">
        {choices.map((choice) => {
          return (
            <div
              className="col-6 py-3 d-flex justify-content-center"
              key={choice.id}
            >
              <ScoreCard
                choiceId={choice.id}
                background={mapProbabilityToBackground(choice.probability)}
                onClick={() => handleCardClick(choice.id)}
              >
                {getCardContent(choice.attributes)}
              </ScoreCard>
            </div>
          );
        })}
      </div>
      <div className="bottom-nav d-flex">
        <Button
          name="Proceed to Decision"
          type="rectangular"
          bgColor="green"
          onClick={handleProceed}
        />
        <Button
          name="Add attribute"
          type="rectangular"
          onClick={handleAddAttribute}
        />
      </div>
    </div>
  );
};

export default Dashboard;
