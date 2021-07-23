import "./Dashboard.scss";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import Button from "../../components/Buttons/Button";
import ScoreCard from "../../components/ScoreCard/ScoreCard";
import ChoiceDetails from "../../components/ChoiceDetails/ChoiceDetails";
import AddCriteria from "../../components/AddCriteria/AddCriteria";

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
        <div key={attr.id} className="d-flex justify-content-between">
          <p className="text-left font-em-8">{attr.name}</p>
          <p className="font-em-8">{attr.score}</p>
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
    <div className="dashboard h-100 row position-relative">
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
      <div className="d-none d-md-block col-md-3" />
      <div className="col-md-6 col-sm-12">
        <div className="scrollable-content p-3">
          <div className="top-nav d-flex justify-content-between">
            <h3>{question ? `${question}?` : ""}</h3>
            <button
              type="button"
              className="back-button d-flex justify-content-center align-items-center"
              onClick={handleNavigateBack}
              tabIndex={0}
              onKeyPress={handleNavigateBack}
              aria-label="go back"
            >
              <FaArrowLeft size={20} color="white" />
            </button>
          </div>
          <div className="main-content row">
            {choices.every((choice_) => choice_.name) ? (
              choices.map((choice, index) => {
                return (
                  <div
                    className="score-card-div col-6 py-3 d-flex justify-content-center animate__animated animate__fadeIn"
                    style={{ animationDelay: `${index / 2}s` }}
                    key={choice.id}
                  >
                    <ScoreCard
                      choiceId={choice.id}
                      background={mapProbabilityToBackground(
                        choice.probability
                      )}
                      onClick={() => handleCardClick(choice.id)}
                      showClose={choices.length > 2}
                    >
                      {getCardContent(choice.attributes)}
                    </ScoreCard>
                  </div>
                );
              })
            ) : (
              <div className="align-items-center d-flex h-50 justify-content-center text-disabled">
                Go back to add your choices
              </div>
            )}
          </div>
        </div>
        <div className="bottom-nav d-flex px-3 pt-2">
          <Button
            name="Decide now!"
            type="rectangular"
            styles={{
              backgroundColor: "#38aeca",
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            }}
            isDisabled={choices.every(
              (choice_) => choice_.attributes.length === 0
            )}
            onClick={() => history.push("/decision")}
          />
          <Button
            name="Add criterion"
            type="rectangular"
            styles={{
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
            }}
            isDisabled={choices.every((choice_) => choice_.name === "")}
            onClick={() => setShowAddCriteria(!showAddCriteria)}
          />
        </div>
      </div>
      <div className="d-none d-md-block col-md-3" />
    </div>
  );
};

export default Dashboard;
