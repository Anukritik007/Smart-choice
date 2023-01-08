import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const ChoiceInputStyled = styled.div`
  padding: 0.25rem 0;
  display: flex;
  align-items: center;

  .field {
    width: 80%;

    > input {
      width: 100%;
      padding: 0.5rem 0.5rem;
      margin: 0.5rem 0;
      font-size: 1rem;
    }
  }

  .delete {
    width: 20%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    margin: auto;
    box-sizing: border-box;
  }
`;
