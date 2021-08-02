import "./App.scss";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import themeContext from "./themeContext";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import GettingStarted from "./pages/GettingStarted/GettingStarted";
import store from "./redux/store";
import Dashboard from "./pages/Dashboard/Dashboard";
import Decision from "./pages/Decision/Decision";
import { getTimeOfDay } from "./utils/utils";
import Settings from "./pages/Settings/Settings";
import History from "./pages/History/History";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LeftNav from "./components/LeftNav/LeftNav";
import RightNav from "./components/RightNav/RightNav";

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
            <div
              className={`view-container ${
                isThemeDark ? "theme-dark" : "theme-light"
              }`}
            >
              <LeftNav />
              <main>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/getting-started">
                    <GettingStarted />
                  </Route>
                  <Route path="/settings">
                    <Settings />
                  </Route>
                  <Route path="/history">
                    <History />
                  </Route>
                  <ProtectedRoute path="/dashboard" component={Dashboard} />
                  <ProtectedRoute path="/decision" component={Decision} />
                  <Route path="*">
                    <Home />
                  </Route>
                </Switch>
              </main>
              <RightNav />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    </themeContext.Provider>
  );
};

export default App;
