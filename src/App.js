import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import themeContext from "./themeContext";
import Header from "./components/Header/Header";
import Home from "./containers/Home/Home";
import GettingStarted from "./containers/GettingStarted/GettingStarted";
import store from "./redux/store";
import Dashboard from "./containers/Dashboard/Dashboard";
import Decision from "./containers/Decision/Decision";
import { getTimeOfDay } from "./utils/utils";

const App = () => {
  const [isThemeDark, toggleThemeDark] = useState(() => {
    const timeOfDay = getTimeOfDay();
    return timeOfDay === "Evening" || timeOfDay === "Night";
  });
  const themeContextValue = {
    isThemeDark,
    toggleTheme: () => toggleThemeDark(!isThemeDark),
  };

  return (
    <themeContext.Provider value={themeContextValue}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <main
              className={`view-container ${
                isThemeDark ? "theme-dark" : "theme-light"
              }`}
            >
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/getting-started">
                  <GettingStarted />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/decision">
                  <Decision />
                </Route>
                <Route path="*">
                  <Home />
                </Route>
              </Switch>
            </main>
          </div>
        </BrowserRouter>
      </Provider>
    </themeContext.Provider>
  );
};

export default App;
