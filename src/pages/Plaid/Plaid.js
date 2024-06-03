// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useEffect, useState } from 'react';
import api from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import PlaidForm from './PlaidForm';

const PlaidLink = (props) => {
  const [linkToken, setLinkToken] = useState(null);

  const generateToken = async () => {
    api
      .post('/api/plaiditem/create_link_token/')
      .then(({ data }) => {
        setLinkToken(data.link_token);
      })
      .catch(error => {
        console.error('Error creating link token:', error.response);
      });
  };
  useEffect(() => {
    generateToken();
  }, []);
  return linkToken != null ? <PlaidForm linkToken={linkToken} {...props} /> : <LoadingSpinner loading={true} />;
};

export default PlaidLink;