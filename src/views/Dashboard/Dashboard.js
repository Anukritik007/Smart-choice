import React from "react";
import Button from "../../components/Buttons/Button";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  const handleAddMore = () => {
    history.push("/getting-started");
  };
  return (
    <div>
      <Button name="Add more" onClick={handleAddMore} />
    </div>
  );
};

export default Dashboard;
