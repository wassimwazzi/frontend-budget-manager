import React, { useState } from 'react';
import api from '../../api';
import Status from '../../components/Status'
import handleDownload from '../../utils/handleDownload';
import { Form, Button, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

const FileUploadForm = ({ onSubmit }) => {
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
                onSubmit()
            })
            .catch((error) => {
                setSuccessMessage(null);
                setErrorMessage('Error uploading file.');
                setUploading(false);
                console.error('Error uploading file:', error.response);
                onSubmit()
            });
    };

    return (
        <Form className='m-3' onSubmit={handleUpload}>
            <InputGroup className="mb-3">
                <Form.Group controlId="formFile" className="me-3">
                    <Form.Control type="file" onChange={handleFileChange} required accept='.csv' />
                </Form.Group>
                <Button variant="primary" type='submit' disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload File'}
                </Button>
                <Button className="ms-3" variant="outline-secondary" onClick={() => handleDownload('/api/uploads/template/', 'template.csv')}>
                    <FontAwesomeIcon icon={faFileArrowDown} size='lg' />
                    <span className="ms-2">Download Template</span>
                </Button>
            </InputGroup>
            <Status
                successMessage={successMessage}
                errorMessage={errorMessage}
                loading={uploading}
            />
        </Form>
    );
};

export default FileUploadForm;
