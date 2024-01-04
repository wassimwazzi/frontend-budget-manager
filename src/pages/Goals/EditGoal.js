import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Alert } from 'react-bootstrap';
import extractErrorMessageFromResponse from "../../utils/extractErrorMessageFromResponse"
import api from "../../api";
import GoalForm from './GoalForm';
import BackLink from '../../components/BackLink';

const CreateGoal = () => {
    const { goalId } = useParams();
    const [goalData, setGoalData] = useState();
    const [submitErrorMessage, setSubmitErrorMessage] = useState();
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        if (goalId) {
            api
                .get(`/api/goals/${goalId}/`)
                .then((res) => {
                    setGoalData(res.data);
                })
        }
    }, [goalId]);

    function submit(data) {
        setSubmitErrorMessage(null);
        api
            .patch(`/api/goals/${goalId}/`, data)
            .then((res) => {
                setGoalData(res.data);
                setSubmitSuccess(true);
            })
            .catch((err) => {
                console.error(err.response);
                setSubmitErrorMessage(extractErrorMessageFromResponse(err));
            });
    }

    return (
        <Container className="py-4 text-center">
            <BackLink href={'/goals'} name={'Goals'} active={false} />
            {
                submitSuccess ?
                    <div>
                        <Alert variant="success">
                            <Alert.Heading>Success!</Alert.Heading>
                            <p>
                                Your goal was updated!
                            </p>
                            <Button variant="outline-success" href={`/goals/${goalId}`}>Click here to view it</Button>
                        </Alert>
                    </div>
                    :
                    goalData && <GoalForm onSubmit={submit} submitErrorMessage={submitErrorMessage} initialData={goalData} />
            }

        </Container>
    );
};

export default CreateGoal;
