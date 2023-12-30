import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const BreadcrumbsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BreadcrumbItem = styled.div`
  cursor: pointer;
  font-size: 1.2rem;
  color: ${(props) => (props.active ? '#007BFF' : '#555')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Separator = styled.div`
  color: #555;
  margin-right: 10px;
`;

const getSeparator = (index, lastIndex) => {
  if (index === lastIndex) {
    return null;
  }
  return <Separator><FontAwesomeIcon icon={faAngleRight} /></Separator>;
}

const BreadCrumbs = ({ steps, currentStepIndex, goTo }) => {
  return (
    <BreadcrumbsContainer>
      {steps.map((step, index) => (
        index <= currentStepIndex &&
        <React.Fragment key={index}>
          <BreadcrumbItem key={index}
            active={(currentStepIndex === index).toString()}
            onClick={() => goTo(index)}
          >
            {step}
          </BreadcrumbItem>
          {getSeparator(index, currentStepIndex)}
        </React.Fragment>
      ))}
    </BreadcrumbsContainer>
  );
};

export default BreadCrumbs;
