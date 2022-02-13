import "./Dashboard.scss";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import Button from "../../components/Buttons/Button";
import ScoreCard from "../../components/ScoreCard/ScoreCard";
import ChoiceDetails from "../../components/ChoiceDetails/ChoiceDetails";
import AddCriteria from "../../components/AddCriteria/AddCriteria";
import { isMobile } from "../../utils/utils";

const Dashboard = () => {
  const history = useHistory();
  const choices = useSelector((state) => state.choices);
  const question = useSelector((state) => state.question);
  const [showChoiceDetails, setShowChoiceDetails] = useState(false);
  const [showAddCriteria, setShowAddCriteria] = useState(false);

  const [selectedChoice, setSelectedChoice] = useState("");
  const handleNavigateBack = () => {
    history.push("/getting-started");
  };

  const getCardContent = (criteria) => {
    if (criteria.length > 0) {
      return criteria.map((attr) => (
        <div key={attr.id} className="card-content">
          <p className="criteria">{attr.name}</p>
          <p>{attr.score}</p>
        </div>
      ));
    }
    return undefined;
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
    setSelectedChoice(id_);
    setShowChoiceDetails(!showChoiceDetails);
  };

  return (
    <div className="dashboard">
      {showChoiceDetails && (
        <ChoiceDetails
          choiceId={selectedChoice}
          onBackdropClick={() => setShowChoiceDetails(!showChoiceDetails)}
        />
      )}
      {showAddCriteria && (
        <AddCriteria
          onBackdropClick={() => setShowAddCriteria(!showAddCriteria)}
        />
      )}
      <div className="scrollable-content">
        <div className="top-nav">
          <h3>{question ? `${question}?` : ""}</h3>
          <button
            type="button"
            className="back-button"
            onClick={handleNavigateBack}
            tabIndex={0}
            onKeyPress={handleNavigateBack}
            aria-label="go back"
          >
            <FaArrowLeft size={20} color="white" />
          </button>
        </div>
        <div className="main-content">
          {choices.map((choice, index) => (
            <div
              className={`score-card-div animate__animated animate__fadeIn ${
                choices.length === 2
                  ? isMobile
                    ? "single-column"
                    : "two-column"
                  : "two-column"
              }`}
              style={{ animationDelay: `${index / 2}s` }}
              key={choice.id}
            >
              <ScoreCard
                choiceId={choice.id}
                background={mapProbabilityToBackground(choice.probability)}
                onClick={() => handleCardClick(choice.id)}
                showClose={choices.length > 2}
              >
                {getCardContent(choice.attributes)}
              </ScoreCard>
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons">
        <Button
          name="Decide now"
          shape={isMobile ? "circular" : "rectangular"}
          styles={{
            backgroundColor: "#38aeca",
            height: isMobile ? "5rem" : "3rem",
            width: isMobile ? "5rem" : "10rem",
            boxShadow: "0 .5rem 1rem rgb(0 0 0 / 40%)",
          }}
          isDisabled={choices.every(
            (choice_) => choice_.attributes.length === 0
          )}
          onClick={() => history.push("/decision")}
        />
        <Button
          name="Add criterion"
          shape={isMobile ? "circular" : "rectangular"}
          styles={{
            height: isMobile ? "5rem" : "3rem",
            width: isMobile ? "5rem" : "10rem",
            boxShadow: "0 .5rem 1rem rgb(0 0 0 / 40%)",
          }}
          isDisabled={choices.every((choice_) => choice_.name === "")}
          onClick={() => setShowAddCriteria(!showAddCriteria)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
