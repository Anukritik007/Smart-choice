import "./Settings.scss";
import React from "react";

const Settings = () => {
  return (
    <div className="settings">
      <div className="settings-card">
        <h3>Settings</h3>
        <div>
          <ul>
            <li>
              Set score scale:{" "}
              <span className="text-disabled">Coming soon</span>
            </li>
            <li>
              Set preferred theme:{" "}
              <span className="text-disabled">Coming soon</span>
            </li>
            <li>
              Disable card colouring:{" "}
              <span className="text-disabled">Coming soon</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
