import React from "react";
import styled, { css } from "styled-components";

const transitionStyles = ({ duration }) => css`
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height ${duration}s ease-out, opacity ${duration}s ease-out;

  &.visible {
    max-height: 1000px;
    opacity: 1;
  }
`;

// moves in from the left
const transitionStyles2 = ({ duration }) => css`
  transform: translateX(-100%);
    opacity: 0;
    overflow: hidden;
    transition: transform ${duration}s ease-out, opacity ${duration}s ease-out;

    &.visible {
        transform: translateX(0);
        opacity: 1;
    }
`;

const TransitionContainer = styled.div`
  ${transitionStyles}
`;

const Transition = ({ children, visible, duration = 0.3 }) => {
    return (
        <TransitionContainer
            className={visible ? "visible" : ""}
            duration={duration}
        >
            {children}
        </TransitionContainer>
    );
};

export default Transition;
