import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useMultistepForm } from '../../utils/useMultiStepForm';
import { getCurrentMonth } from '../../utils/dateUtils';
import extractErrorMessageFromResponse from "../../utils/extractErrorMessageFromResponse"
import api from "../../api";
import Status from '../../components/Status';
import DescriptionForm from './Stepper/DescriptionForm';
import AmountForm from './Stepper/AmountForm';
import DateForm from './Stepper/DateForm';
import BreadCrumbs from '../../components/BreadCrumbs';
import BackLink from '../../components/BackLink';

const INITIAL_DATA = {
    description: '',
    amount: '',
    start_date: getCurrentMonth(),
    expected_completion_date: '',
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

const GoalForm = () => {
    const [data, setData] = useState(INITIAL_DATA);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [preventSubmit, setPreventSubmit] = useState(false);
    const [goalId, setGoalId] = useState(null);
    const [submitErrorMessage, setSubmitErrorMessage] = useState();

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

    function submit() {
        setSubmitErrorMessage(null);
        api
            .post('/api/goals/', data)
            .then((res) => {
                setGoalId(res.data.id);
            })
            .catch((err) => {
                console.error(err.response);
                setSubmitErrorMessage(extractErrorMessageFromResponse(err));
            });
    }

    function resetData() {
        window.location.reload();
    }

    function onSubmit(e) {
        e.preventDefault();
        if (isLastStep) {
            submit();
            return;
        }
        handleTransition(next)
    }

    return (
        <Container className="py-4 text-center">
            <BackLink href={'/goals'} name={'Goals'} active={false} />
            {
                goalId ?
                    <div>
                        <Alert variant="success">
                            <Alert.Heading>Success!</Alert.Heading>
                            <p>
                                Your goal has been created!
                            </p>
                            <Button variant="outline-success" href={`/goals/${goalId}`}>Click here to view it</Button>
                            <Button onClick={resetData} variant="outline-primary" className='ms-2'>
                                Click here to add another goal
                            </Button>
                        </Alert>
                    </div>
                    :
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
                            <Form onSubmit={onSubmit} className="mb-4">
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
            }

        </Container>
    );
};

export default GoalForm;
