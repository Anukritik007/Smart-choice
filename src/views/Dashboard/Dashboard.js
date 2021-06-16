import React, { useState } from "react";
import Button from "../../components/Buttons/Button";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import ScoreCard from "../../components/ScoreCard/ScoreCard";
import ChoiceDetails from "./ChoiceDetails";
import AddAttribute from "./AddAttribute";
import { FaArrowLeft } from "react-icons/fa";

const Dashboard = () => {
  const history = useHistory();
  const choices = useSelector((state) => state.choices);
  const question = useSelector((state) => state.question);
  const [showChoiceDetails, setShowChoiceDetails] = useState(false);
  const [showAddAttributes, setShowAddAttributes] = useState(false);

  const [selectedChoice, setSelectedChoice] = useState("");

  const handleNavigateBack = () => {
    history.push("/getting-started");
  };

  const getCardContent = (attributes) => {
    let jsx_;
    if (attributes.length > 0) {
      jsx_ = attributes.map((attr) => {
        return (
          <div key={attr.id} className="d-flex justify-content-between">
            <p className="text-left font-em-8">{attr.name}</p>
            <p className="font-em-8">{attr.score}</p>
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
    setSelectedChoice(id_);
    setShowChoiceDetails(!showChoiceDetails);
  };

  const handleAddAttribute = () => {
    setShowAddAttributes(!showAddAttributes);
  };
  const handleProceed = () => {
    history.push("/decision");
  };

  return (
    <div className="dashboard h-100 position-relative">
      {showChoiceDetails && (
        <ChoiceDetails
          choiceId={selectedChoice}
          onBackdropClick={() => setShowChoiceDetails(!showChoiceDetails)}
        />
      )}
      {showAddAttributes && (
        <AddAttribute
          onBackdropClick={() => setShowAddAttributes(!showAddAttributes)}
        />
      )}
      <div className="main-content h-100 p-3">
        <div className="d-flex justify-content-between">
          <h3>{question ? question + "?" : ""}</h3>
          <div
            className="back-button d-flex justify-content-center align-items-center shadow"
            onClick={handleNavigateBack}
          >
            <FaArrowLeft size={20} color="white" />
          </div>
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
                  showClose={choices.length > 2}
                >
                  {getCardContent(choice.attributes)}
                </ScoreCard>
              </div>
            );
          })}
        </div>
        <div className="bottom-nav d-flex">
          <Button
            name="Decide now!"
            type="rectangular"
            styles={{
              backgroundColor: "#007a96",
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            }}
            isDisabled={choices.every(
              (choice_) => choice_.attributes.length === 0
            )}
            onClick={handleProceed}
          />
          <Button
            name="Add attribute"
            type="rectangular"
            styles={{
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
            }}
            onClick={handleAddAttribute}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
