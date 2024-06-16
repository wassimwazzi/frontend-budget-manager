import React, { useEffect, useState } from 'react';
import api from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import PlaidForm from './PlaidForm';

export const generateToken = async (onSuccess) => {
  api
    .post('/api/plaiditem/create_link_tokens/')
    .then(({ data }) => {
      onSuccess(data.link_token);
    })
    .catch(error => {
      console.error('Error creating link token:', error.response);
    });
};

const PlaidLink = ({ linkToken, ...props }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (loading && !linkToken) {
    return <LoadingSpinner loading={true} />;
  }

  return <PlaidForm linkToken={linkToken} {...props} />;
};


export default PlaidLink;