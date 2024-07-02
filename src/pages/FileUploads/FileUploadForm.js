import React, { useState } from 'react';
import api from '../../api';
import { useStatus } from '../../components/Status'
import handleDownload from '../../utils/handleDownload';
import { Form, Button, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../components/LoadingSpinner';
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse';

const FileUploadForm = ({ onSubmit }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const { showStatus } = useStatus();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true);

        api
            .post('/api/uploads/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                showStatus('File uploaded successfully.', 'success');
                setFile(null);
                setUploading(false);
                onSubmit()
            })
            .catch((error) => {
                showStatus(extractErrorMessageFromResponse(error), 'error');
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
            <LoadingSpinner loading={uploading} />
        </Form>
    );
};

export default FileUploadForm;
