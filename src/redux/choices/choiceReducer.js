import {
  ADD_CHOICE,
  UPDATE_CHOICES,
  UPDATE_QUESTION,
  DELETE_CHOICE,
} from "./actionTypes";

const initialState_ = {
  question: "",
  choices: [
    {
      id: "a101",
      name: "",
      attributes: [],
      score: 0,
      probability: "low",
    },
    {
      id: "a102",
      name: "",
      attributes: [],
      score: 0,
      probability: "low",
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
