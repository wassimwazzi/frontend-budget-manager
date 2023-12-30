import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useMultistepForm } from '../../utils/useMultiStepForm';
import { getCurrentMonth } from '../../utils/dateUtils';
import DescriptionForm from './Stepper/DescriptionForm';
import AmountForm from './Stepper/AmountForm';
import DateForm from './Stepper/DateForm';
import BreadCrumbs from '../../components/BreadCrumbs';
import styled, { keyframes } from 'styled-components';
// ... (your other imports)

const swooshAnimation = keyframes`
  0% {
    transform: scale(0.8) translateY(50%) rotate(-20deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0) rotate(0deg);
    opacity: 1;
  }
`;

const INITIAL_DATA = {
    description: '',
    amount: '',
    start_date: getCurrentMonth(),
    end_date: '',
};

const BREADCRUMBS = ['Description', 'Amount', 'Date'];

const TITLES = [
    'Describe your goal',
    'Set your goal amount',
    'Set your goal dates',
];

const StyledCard = styled(Card)`
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
  animation: ${swooshAnimation} 0.5s ease-out;
  opacity: ${(props) => (props.isTransitioning ? 0 : 1)};
`;

const GoalForm = () => {
    const [data, setData] = useState(INITIAL_DATA);
    const [isTransitioning, setIsTransitioning] = useState(false);

    function updateFields(fields) {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    }

    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        next,
        goTo,
    } = useMultistepForm([
        <DescriptionForm {...data} updateFields={updateFields} />,
        <AmountForm {...data} updateFields={updateFields} />,
        <DateForm {...data} updateFields={updateFields} />,
    ]);

    function handleTransition(direction) {
        setIsTransitioning(true);

        setTimeout(() => {
            direction();
            setIsTransitioning(false);
        }, 500);
    }

    function onSubmit(e) {
        e.preventDefault();
        if (isLastStep) {
            alert(JSON.stringify(data));
            return;
        }
        handleTransition(next)
    }

    return (
        <Container className="py-4 text-center">
            <BreadCrumbs
                steps={BREADCRUMBS}
                currentStepIndex={currentStepIndex}
                goTo={goTo}
            />
            <StyledCard
                className="border-0"
                isTransitioning={isTransitioning}
                style={{
                    borderRadius: '20px',
                    backgroundColor: '#F5F5F5',
                    color: '#333',
                    textAlign: 'center',
                    padding: '20px',
                    boxShadow: '0px 8px 16px #00000029',
                }}
            >
                <Card.Title as="h2" className="mb-4" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                    {TITLES[currentStepIndex]}
                </Card.Title>
                <Card.Body className='p-5'>
                    <Form onSubmit={onSubmit} className="mb-4">
                        {step}
                        <div className="d-flex justify-content-center mt-4">
                            {!isFirstStep && (
                                <Button onClick={() => handleTransition(back)} variant="secondary" className="me-2">
                                    Back
                                </Button>
                            )}
                            <Button type="submit" variant="primary">
                                {isLastStep ? 'Submit' : 'Next'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </StyledCard>
        </Container>
    );
};

export default GoalForm;
