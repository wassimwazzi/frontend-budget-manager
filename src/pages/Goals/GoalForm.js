import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useMultistepForm } from '../../utils/useMultiStepForm';
import { getCurrentMonth } from '../../utils/dateUtils';
import Status from '../../components/Status';
import DescriptionForm from './Stepper/DescriptionForm';
import AmountForm from './Stepper/AmountForm';
import DateForm from './Stepper/DateForm';
import BreadCrumbs from '../../components/BreadCrumbs';

const INITIAL_DATA = {
    description: '',
    amount: '',
    start_date: getCurrentMonth(),
    expected_completion_date: '',
    recurring: false,
};

const BREADCRUMBS = ['Description', 'Amount', 'Date'];

const TITLES = [
    'Describe your goal',
    'Set your goal amount',
    'Set your goal dates',
    'Review your goal',
];

const StyledCard = ({ children, isTransitioning, ...props }) => (
    <Card
        {...props}
        style={{
            transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
            opacity: isTransitioning ? 0 : 1,
            ...props.style,
        }}
    >
        {children}
    </Card>
);

const GoalForm = ({ submitErrorMessage, onSubmit, initialData = INITIAL_DATA }) => {
    const [data, setData] = useState(initialData);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [preventSubmit, setPreventSubmit] = useState(false);

    function updateFields(fields) {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    }

    const {
        currentStepIndex,
        visitedSteps,
        step,
        isFirstStep,
        isLastStep,
        back,
        next,
        goTo,
    } = useMultistepForm([
        <DescriptionForm {...data} updateFields={updateFields} setPreventSubmit={setPreventSubmit} />,
        <AmountForm {...data} updateFields={updateFields} setPreventSubmit={setPreventSubmit} />,
        <DateForm {...data} updateFields={updateFields} setPreventSubmit={setPreventSubmit} />,
    ]);

    function handleTransition(direction) {
        setIsTransitioning(true);

        setTimeout(() => {
            direction();
            setIsTransitioning(false);
        }, 500);
    }

    function onNext(e) {
        e.preventDefault();
        if (isLastStep) {
            onSubmit(data);
            return;
        }
        handleTransition(next)
    }

    return (
        <Container className="py-4 text-center">
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
                <BreadCrumbs
                    steps={BREADCRUMBS}
                    currentStepIndex={currentStepIndex}
                    goTo={goTo}
                    maxStepIndex={visitedSteps.length - 1}
                />
                <Card.Title as="h2" className="mb-4" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                    {TITLES[currentStepIndex]}
                </Card.Title>
                <Card.Body className='p-5'>
                    <Form onSubmit={onNext} className="mb-4">
                        {step}
                        <div className="d-flex justify-content-center mt-4">
                            {!isFirstStep && (
                                <Button onClick={() => handleTransition(back)} variant="secondary" className="me-2">
                                    Back
                                </Button>
                            )}
                            <Button type="submit" variant="primary" disabled={preventSubmit}>
                                {isLastStep ? 'Submit' : 'Next'}
                            </Button>
                        </div>
                        <Status errorMessage={submitErrorMessage} />
                    </Form>
                </Card.Body>
            </StyledCard>
        </Container>
    );
};

export default GoalForm;
