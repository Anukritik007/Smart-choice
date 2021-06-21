import {
  ADD_CHOICE,
  UPDATE_CHOICES,
  DELETE_CHOICE,
  UPDATE_QUESTION,
  RESET,
} from "./actionTypes";

// action creators
export const addChoice = (choice) => {
  return {
    type: ADD_CHOICE,
    payload: choice,
  };
};

export const deleteChoice = (id) => {
  return {
    type: DELETE_CHOICE,
    payload: id,
  };
};

export const updateChoices = (choices) => {
  return {
    type: UPDATE_CHOICES,
    payload: choices,
  };
};

export const updateQuestion = (ques) => {
  return {
    type: UPDATE_QUESTION,
    payload: ques,
  };
};

export const resetState = () => {
  return {
    type: RESET,
  };
};
