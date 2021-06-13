import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./ChoiceDetails.css";
import Button from "../../components/Buttons/Button";
import withOverlay from "../../HOCs/WithOverlay/WithOverlay";

const ChoiceDetails = ({ choiceId }) => {
  const choice_ = useSelector((state) =>
    state.choices.find((choice) => choice.id === choiceId)
  );
  const [allowEdit, setAllowEdit] = useState(false);

  const toggleAllowEdit = () => {
    setAllowEdit(!allowEdit);
  };
  const handleAdd = () => {
    console.log("Add attribue to", choice_.name);
  };

  return (
    <section
      className="content position-relative p-2"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="header py-2 d-flex justify-content-between align-items-center">
        <h3 className="m-0 px-3">{choice_.name}</h3>
        <h3 className="total-score m-0 d-flex justify-content-center align-items-center">
          {choice_.score}
        </h3>
      </div>

      {allowEdit ? (
        <div className="display-body">Allows to Edit</div>
      ) : (
        <div className="display-body p-2">
          {choice_ && choice_.attributes.length > 0 ? (
            choice_.attributes.map((attr) => (
              <div key={attr.id} className="d-flex justify-content-between">
                <p>{attr.name}</p>
                <p>{attr.score}</p>
              </div>
            ))
          ) : (
            <div className="empty-state">
              Looks like you haven't added your points.
            </div>
          )}
        </div>
      )}

      <div className="bottom-nav">
        {choice_.attributes.length === 0 ? (
          <Button
            name="Add Attributes"
            type="rectangular"
            bgColor="green"
            onClick={handleAdd}
          />
        ) : (
          <Button
            name="Edit"
            type="rectangular"
            bgColor="green"
            onClick={toggleAllowEdit}
          />
        )}
      </div>
    </section>
  );
};

export default withOverlay(ChoiceDetails);
