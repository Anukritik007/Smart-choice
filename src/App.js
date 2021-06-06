import "./App.css";
import Header from "./components/Header/Header";
import Home from "./views/Home/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GettingStarted from "./views/GettingStarted/GettingStarted";
import { Provider } from "react-redux";
import store from "./redux/store";

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
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
