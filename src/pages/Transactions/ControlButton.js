import React from 'react';
import { Button } from 'react-bootstrap';

export const buttonStyle = {
    // backgroundColor: '#3A84FF', // Custom blue background color
    // borderColor: '#3A84FF', // Match the border color with background
    color: '#ffffff', // White text color
    borderRadius: '25px', // Rounded corners
    fontSize: '16px', // Slightly larger font size
    fontWeight: 'bold', // Bold text
    padding: '1rem 1rem', // Padding for the button
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
    transition: 'all 0.3s ease', // Smooth transition for hover effects
    backgroundImage: 'linear-gradient(to right, #4FACFE 0%, #00F2FE 100%)', // Gradient background
};

export const hoverStyle = {
    backgroundColor: '#357AE8', // Slightly darker blue on hover
    borderColor: '#357AE8', // Match the border color with background on hover
    backgroundImage: 'none'
};

const AddButton = ({ onClick }) => {
    return (
        <Button
            variant="primary"
            onClick={onClick}
            style={buttonStyle}
            onMouseEnter={(e) => {
                Object.assign(e.target.style, hoverStyle);
            }}
            onMouseLeave={(e) => {
                Object.assign(e.target.style, buttonStyle);
            }}
        >
            Add Transaction
        </Button>
    );
};

export default AddButton;
