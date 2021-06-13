import {
  ADD_CHOICE,
  UPDATE_CHOICES,
  UPDATE_QUESTION,
  DELETE_CHOICE,
  RESET,
} from "./actionTypes";

const initialState_ = {
  question: "",
  choices: [
    {
      id: "a101",
      name: "",
      attributes: [],
      score: 0,
      probability: "medium",
    },
    {
      id: "a102",
      name: "",
      attributes: [],
      score: 0,
      probability: "medium",
    },
  ],
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

    case UPDATE_CHOICES:
      return {
        ...state,
        choices: action.payload,
      };

    case DELETE_CHOICE:
      const splicedChoices_ = [...state.choices];
      splicedChoices_.splice(
        splicedChoices_.findIndex((choice) => choice.id === action.payload),
        1
      );
      return {
        ...state,
        choices: splicedChoices_,
      };

    case UPDATE_QUESTION:
      return {
        ...state,
        question: action.payload,
      };

    case RESET:
      return initialState_;

    default:
      return state;
  }
};

export default choiceReducer;
