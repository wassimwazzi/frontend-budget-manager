import React, { useState } from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import extractErrorMessageFromResponse from "../../utils/extractErrorMessageFromResponse"
import api from "../../api";
import GoalForm from './GoalForm';
import BackLink from '../../components/BackLink';

const CreateGoal = () => {
    const [goalId, setGoalId] = useState();
    const [submitErrorMessage, setSubmitErrorMessage] = useState();

    function submit(data) {
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
                    <GoalForm onSubmit={submit} submitErrorMessage={submitErrorMessage} />
            }

        </Container>
    );
};

export default CreateGoal;
