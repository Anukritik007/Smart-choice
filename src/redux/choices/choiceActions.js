import { ADD_CHOICE, UPDATE_QUESTION } from "./actionTypes";

//action creators
export const addChoice = (choice) => {
  return {
    type: ADD_CHOICE,
    payload: choice,
  };
};

export const updateQuestion = (ques) => {
  return {
    type: UPDATE_QUESTION,
    payload: ques,
  };
};
