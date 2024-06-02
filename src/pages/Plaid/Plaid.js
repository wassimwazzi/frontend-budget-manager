// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import api from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Button } from 'react-bootstrap';

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
  return linkToken != null ? <Link linkToken={linkToken} {...props} /> : <LoadingSpinner loading={true} />;
};
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link

const Link = ({ linkToken, buttonText = 'Link account', ...props }) => {
  console.log('Link props:', props);
  const onSuccess = React.useCallback((public_token, metadata) => {
    api
      .post('/api/plaiditem/exchange_public_token/', { public_token })
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
    <Button onClick={() => open()} disabled={!ready} {...props}>
      {buttonText}
    </Button>
  );
};
export default PlaidLink;