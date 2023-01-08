import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const AddCriteriaStyled = styled.section`
  min-width: 40vw;
  margin: auto;
  background: white;

  .display-body {
    min-height: 30vh;
    max-height: 55vh;
    overflow: scroll;
    padding: 0.5rem;

    label {
      width: 100%;
      padding-top: 0.5rem;
      text-align: left;

      input {
        width: 100%;
        padding: 0.5rem;
      }
    }

    .choice-label {
      padding-top: 1rem;
      text-align: left;
    }
  }

  .button-wrapper {
    margin-top: 0.5rem;
    padding: 0.5rem;
  }
`;
