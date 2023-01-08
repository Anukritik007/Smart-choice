import styled from "styled-components";

export const ChoiceDetailStyled = styled.section`
  width: 40vw;
  text-align: center;
  border-radius: 4px;

  .display-body {
    min-height: 30vh;
    max-height: 55vh;
    overflow: scroll;
    overflow-x: hidden;

    .criteria-info {
      padding: 0.5rem;
      margin-bottom: 1.5rem;

      input {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1.5rem;
      }

      .MuiSlider-root {
        > span {
          color: #007a96;
        }
      }

      .MuiSlider-markLabel {
        color: black;
      }
    }

    .empty-state {
      color: #9fa9b9;
    }

    .criteria-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;

      .criteria-name {
        text-align: left;
        max-width: 80%;
      }

      .criteria-score {
        text-align: right;
        padding: 0 0.5rem;
      }
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: center;

    button {
      width: 50%;
    }
  }

  /* mobile */
  @media only screen and (max-width: 767px) {
    width: 74vw;
    margin: auto;
  }
`;

export const ChoiceHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  .choice-name {
    margin: 0;
    text-align: left;
    max-width: 80%;
  }

  .total-score {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2em;
    width: 2em;
    box-shadow: 0 0 8px 0 #c1c1ca inset;
    border-radius: 50%;
    margin: 0;
    margin-right: 2em;
  }
`;
