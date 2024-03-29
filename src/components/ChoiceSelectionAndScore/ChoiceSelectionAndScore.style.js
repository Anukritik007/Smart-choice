import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const OptionGroupStyled = styled.div`
  border: 1px solid #dadaea;
  border-radius: 5px;
  overflow: hidden;
  padding: 1rem;
  margin: 0.5rem 0;

  &.collapsed {
    height: 40px;
    transition: height 0.2s;
  }

  &.expanded {
    height: 170px;
    transition: height 0.2s;
  }

  .custom-check-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    p {
      margin: 0;
    }

    .check-button {
      display: inline-block;
    }
  }

  .selected-score {
    display: flex;
    justify-content: space-between;

    p {
      span {
        padding: 0.5rem;
      }
    }
  }

  .MuiSlider-root {
    > span {
      color: #007a96;
    }

    .MuiSlider-markLabel {
      color: black;
    }
  }
`;
