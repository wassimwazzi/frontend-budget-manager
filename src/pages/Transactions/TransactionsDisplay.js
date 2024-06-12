import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Item from '../../components/Item'
import { DeleteButton } from '../../components/ActionButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill1Wave, faMoneyBillTrendUp, faFileImport, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import PlaidTransactionCard from './PlaidTransaction';
import styled from 'styled-components';

function CustomToggle({ children, eventKey }) {

    return (
        <div
            style={{ cursor: 'pointer' }}
            onClick={useAccordionButton(eventKey, () => null)}
        >
            {children}
        </div>
    );
}

const IconWrapper = styled.div`
  .icon {
    font-size: 1.5rem; /* Default size for small screens */
  }

  @media (min-width: 600px) {
    .icon {
      font-size: 2rem; /* Medium screens */
    }
  }

  @media (min-width: 900px) {
    .icon {
      font-size: 2.5rem; /* Large screens */
    }
  }

  @media (min-width: 1200px) {
    .icon {
      font-size: 3rem; /* Extra large screens */
    }
  }
`;

const dateDisplay = (date) => {
    const dateObj = new Date(date);
    const thisYear = new Date().getFullYear();
    if (dateObj.getFullYear() === thisYear) {
        return dateObj.toLocaleDateString('default', { month: 'short', day: 'numeric' });
    }
    return dateObj.toLocaleDateString('default', { year: 'numeric', month: 'short', day: 'numeric' });
}


const IncomeOrExpenseIcon = ({ income }) => {
    // if (income) {
    //     return <FontAwesomeIcon icon={faMoneyBillTrendUp} size='xs' color='green' />
    // }
    // return <FontAwesomeIcon icon={faMoneyBill1Wave} size='s' />
    return (
        <IconWrapper>
            <FontAwesomeIcon icon={income ? faMoneyBillTrendUp : faMoneyBill1Wave} className='icon' />
        </IconWrapper>
    )
}

const InferredCategoryPill = () => {
    const style = {
        display: 'inline-block',
        padding: '0.5rem 1rem',
        fontSize: '14px',
        color: '#fff',
        backgroundColor: '#dbb749',
        borderRadius: '200px',
        textAlign: 'center',
        whiteSpace: 'nowrap'
    };

    return (
        <div style={style}>
            <FontAwesomeIcon icon={faLightbulb} style={{ marginRight: '0.5rem' }} />
            Inferred Category
        </div>
    );
};

const TransactionElementStyle = {
    flex: 1,
    marginLeft: '1rem',
    whiteSpace: 'nowrap'
}

const InlineElement = ({ display, val }) => {
    return (
        <div>
            <h6 style={{ display: 'inline-block' }}>{`${display} `}</h6>
            <p style={{ display: 'inline-block', marginLeft: '2px' }}>{val}</p>
        </div>
    )
}

const TransactionsDisplay = ({ transactions, handleDelete, handleEdit }) => {
    const TransactionItem = ({ transaction, id }) => (
        <div className='p-3' style={{ overflow: 'scroll' }}>
            <CustomToggle eventKey={id}>
                <Item>
                    <div className='d-flex justify-content-between'>
                        <div style={{ flex: 1 }}>
                            <IncomeOrExpenseIcon income={transaction.category.income} />
                        </div>
                        <p style={TransactionElementStyle}>{transaction.code}</p>
                        <h6 style={TransactionElementStyle}>{transaction.category.category}</h6>
                        <div style={TransactionElementStyle}>
                            <h6 >${transaction.amount}</h6>
                            <p>{dateDisplay(transaction.date)}</p>
                        </div>
                    </div>
                </Item>
                <Accordion.Collapse eventKey={id}>
                    <div className='py-2 px-1' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <div className='d-flex justify-content-around' style={{ marginTop: '1rem' }}>
                            {transaction.description && <InlineElement display={'Description:'} val={transaction.description} />}
                            <InlineElement display={'Category:'} val={transaction.category.category} />
                            {transaction.inferred_category && <div><InferredCategoryPill /></div>}
                            {transaction.file && <div><FontAwesomeIcon icon={faFileImport} size='1x' /> {transaction.file.file}</div>}
                        </div>
                        {transaction.plaid_transaction && <PlaidTransactionCard transaction={transaction.plaid_transaction} />}
                        <div className='d-flex justify-content-center'>
                            <button onClick={() => handleEdit(transaction.id)} className='btn btn-secondary'>Edit</button>
                            <DeleteButton handleDelete={() => handleDelete(transaction.id)} warningMessage={'Are you sure you want to delete this transaction?'} />
                        </div>
                    </div>
                </Accordion.Collapse>
            </CustomToggle>
        </div>
    )

    return (
        <Accordion>
            {
                transactions.map((transaction, index) => (
                    <TransactionItem transaction={transaction} id={index} key={index}></TransactionItem>
                ))
            }
        </Accordion >
    )
}

export default TransactionsDisplay;
