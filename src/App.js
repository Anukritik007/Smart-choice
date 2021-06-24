import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import themeContext from "./themeContext";
import Header from "./components/Header/Header";
import Home from "./views/Home/Home";
import GettingStarted from "./views/GettingStarted/GettingStarted";
import store from "./redux/store";
import Dashboard from "./views/Dashboard/Dashboard";
import Decision from "./views/Decision/Decision";

const App = () => {
  const [isThemeDark, toggleThemeDark] = useState(true);
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
            <div
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
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    </themeContext.Provider>
  );
};

export default App;
