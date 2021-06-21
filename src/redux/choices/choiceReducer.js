import {
  ADD_CHOICE,
  UPDATE_CHOICES,
  UPDATE_QUESTION,
  DELETE_CHOICE,
  RESET,
} from "./actionTypes";

const initialState = {
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
const getIntialStateCopy = () => JSON.parse(JSON.stringify(initialState));

const choiceReducer = (state = getIntialStateCopy(), action) => {
  switch (action.type) {
    case ADD_CHOICE: {
      const newChoices = [...state.choices];
      newChoices.push(action.payload);
      return {
        ...state,
        choices: newChoices,
      };
    }

    case UPDATE_CHOICES:
      return {
        ...state,
        choices: action.payload,
      };

    case DELETE_CHOICE: {
      const splicedChoices = [...state.choices];
      splicedChoices.splice(
        splicedChoices.findIndex((choice) => choice.id === action.payload),
        1
      );
      return {
        ...state,
        choices: splicedChoices,
      };
    }

    case UPDATE_QUESTION:
      return {
        ...state,
        question: action.payload,
      };

    case RESET:
      return getIntialStateCopy();

    default:
      return state;
  }
};

export default choiceReducer;
