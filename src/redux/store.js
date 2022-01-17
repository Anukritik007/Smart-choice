import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import choiceReducer from "./choices/choiceReducer";

const store = createStore(choiceReducer, composeWithDevTools());

export default store;

// before page is closed or refreshed save state to localStorage
window.onbeforeunload = () => {
  const { question, choices } = store.getState();

  localStorage.setItem("choices", JSON.stringify(choices));
  localStorage.setItem("question", JSON.stringify(question));
};
