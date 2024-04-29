// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import api from '../../api';
const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState(null);
  const generateToken = async () => {
    api
      .post('/api/plaid/create_link_token/')
      .then(({ data }) => {
        setLinkToken(data.link_token);
      })
  };
  useEffect(() => {
    generateToken();
  }, []);
  return linkToken != null ? <Link linkToken={linkToken} /> : <></>;
};
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link

const Link = ({ linkToken }) => {
  const onSuccess = React.useCallback((public_token, metadata) => {
    api
      .post('/api/plaid/exchange_public_token/', { public_token })
      .catch(error => {
        console.error('Error setting access token:', error.response)
      });
  }, []);
  const config = {
    token: linkToken,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
};
export default PlaidLink;