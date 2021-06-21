import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import choiceReducer from "./choices/choiceReducer";

const store = createStore(choiceReducer, composeWithDevTools());

export default store;
