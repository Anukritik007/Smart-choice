import { ADD_CHOICE, UPDATE_QUESTION } from "./actionTypes";

const initialState_ = {
  question: "",
  choices: [],
  leaders: [],
};

const choiceReducer = (state = initialState_, action) => {
  switch (action.type) {
    case ADD_CHOICE:
      const newChoices_ = [...state.choices];
      newChoices_.push(action.payload);
      return {
        ...state,
        choices: newChoices_,
      };

    case UPDATE_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
    default:
      return state;
  }
};

export default choiceReducer;
