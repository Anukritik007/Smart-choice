import "./App.css";
import Header from "./components/Header/Header";
import Home from "./views/Home/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GettingStarted from "./views/GettingStarted/GettingStarted";
import { Provider } from "react-redux";
import store from "./redux/store";
import Dashboard from "./views/Dashboard/Dashboard";
import Decision from "./views/Decision/Decision";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="view-container">
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
  );
};

export default App;
