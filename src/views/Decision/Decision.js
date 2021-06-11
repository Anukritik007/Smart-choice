import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Buttons/Button";

const Decision = () => {
  const history = useHistory();
  const handleNavigateBack = () => {
    history.push("/dashboard");
  };
  return (
    <div>
      Your Decision should be ....
      <div className="bottom-nav">
        <Button name="Back" onClick={handleNavigateBack} />
      </div>
    </div>
  );
};

export default Decision;
