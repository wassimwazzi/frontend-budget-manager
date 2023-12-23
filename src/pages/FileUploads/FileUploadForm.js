import React, { useEffect, useState } from 'react';
import api from '../../api';
import Status from '../../components/Status'
import { Form, Button, InputGroup } from 'react-bootstrap'

const FileUploadForm = ({ onUpdate }) => {
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true);

        api
            .post('/api/uploads/', formData)
            .then((response) => {
                setSuccessMessage('File uploaded successfully.');
                setErrorMessage(null);
                setFile(null);
                setUploading(false);
                onUpdate()
            })
            .catch((error) => {
                setSuccessMessage(null);
                setErrorMessage('Error uploading file.');
                setUploading(false);
                console.error('Error uploading file:', error);
                onUpdate()
            });
    };

    return (
        <Form className='mb-3' onSubmit={handleUpload}>
            <InputGroup>
                <Form.Group controlId="formFile" className="mr-3">
                    <Form.Control type="file" onChange={handleFileChange} required />
                </Form.Group>
                <Button variant="primary" type='submit' disabled={uploading}>
                    Upload File
                </Button>
                <Status
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                    loading={uploading}
                />
            </InputGroup>
        </Form>
    );
};

export default FileUploadForm;
