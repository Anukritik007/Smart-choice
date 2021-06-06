import { createStore } from "redux";
import choiceReducer from "./choices/choiceReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(choiceReducer, composeWithDevTools());

export default store;
