import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSync, faUser, faCreditCard, faCalendarAlt, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { formatToHumanReadableDate } from '../../utils/dateUtils';

const getLocation = (location) => (
    [location.address, location.postal_code, location.city, location.region, location.country].filter(Boolean).join(', ')
    || 'No location provided'
);

const statusColor = (status) => {
    switch (status) {
        case 'ADDED':
            return 'green';
        case 'REMOVED':
            return 'red';
        case 'MODIFIED':
            return 'yellow';
        default:
            return 'black';
    }
};

const PlaidTransactionCard = ({ transaction }) => {
    return (
        <div className="card" style={{ margin: '1rem auto', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', border: 'none' }}>
            <div className="card-header" style={{ backgroundColor: '#fff', padding: '1rem' }}>
                <FontAwesomeIcon icon={faWandSparkles} style={{ marginRight: '10px', color: '#007bff' }} />
                <h5 style={{ display: 'inline-block', margin: 0 }}>Powered by Plaid</h5>
            </div>
            <div className="card-body" style={{ padding: '1rem' }}>
                <div className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '10px', color: '#007bff' }} />
                    <div>
                        <h6 style={{ margin: 0 }}>Location</h6>
                        <p style={{ margin: 0 }}>{getLocation(transaction.location)}</p>
                    </div>
                </div>
                <div className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faSync} style={{ marginRight: '10px', color: statusColor(transaction.status) }} />
                    <div>
                        <h6 style={{ margin: 0 }}>Status</h6>
                        <p style={{ margin: 0 }}>{transaction.status}</p>
                    </div>
                </div>
                <div className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px', color: '#007bff' }} />
                    <div>
                        <h6 style={{ margin: 0 }}>Account Name</h6>
                        <p style={{ margin: 0 }}>{transaction.account.official_name}</p>
                    </div>
                </div>
                <div className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '10px', color: '#007bff' }} />
                    <div>
                        <h6 style={{ margin: 0 }}>Account Type</h6>
                        <p style={{ margin: 0 }}>{`${transaction.account.type} - ${transaction.account.subtype}`}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '10px', color: '#007bff' }} />
                    <div>
                        <h6 style={{ margin: 0 }}>Sync Date</h6>
                        <p style={{ margin: 0 }}>{formatToHumanReadableDate(transaction.item_sync.last_synced)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaidTransactionCard;
