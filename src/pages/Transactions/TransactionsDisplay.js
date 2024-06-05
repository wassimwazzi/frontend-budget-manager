import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Item from '../../components/Item'
import { DeleteButton } from '../../components/ActionButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill1Wave, faMoneyBillTrendUp, faFileImport, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import PlaidTransactionCard from './PlaidTransaction';

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

const IncomeOrExpenseIcon = ({ income }) => {
    if (income) {
        return <FontAwesomeIcon icon={faMoneyBillTrendUp} size='2x' color='green' />
    }
    return <FontAwesomeIcon icon={faMoneyBill1Wave} size='2x' />
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

const TransactionsDisplay = ({ transactions, handleDelete, handleEdit }) => {
    const TransactionItem = ({ transaction, id }) => (
        <div className='p-3' style={{ overflow: 'scroll' }}>
            <CustomToggle eventKey={id}>
                <Item>
                    <div className='d-flex justify-content-between'>
                        <div style={{ flex: 1 }}>
                            <IncomeOrExpenseIcon income={transaction.category.income} />
                        </div>
                        <h5 style={TransactionElementStyle}>{transaction.date}</h5>
                        <h5 style={TransactionElementStyle}>{transaction.category.category}</h5>
                        <p style={TransactionElementStyle}>{transaction.code}</p>
                        <div style={TransactionElementStyle} className='d-flex'>
                            <h5 >{transaction.amount}</h5>
                            <p style={{ marginLeft: '0.5rem' }}>{transaction.currency}</p>
                        </div>
                    </div>
                </Item>
                <Accordion.Collapse eventKey={id}>
                    <Item>
                        <div style={{ borderTop: '1px solid #dee2e6' }}>
                            <div className='d-flex justify-content-around' style={{ marginTop: '1rem' }}>
                                {transaction.description && <p>Description: {transaction.description}</p>}
                                {transaction.inferred_category && <div><InferredCategoryPill /></div>}
                                {transaction.file && <div><FontAwesomeIcon icon={faFileImport} size='1x' /> {transaction.file.file}</div>}
                            </div>
                        </div>
                        {transaction.plaid_transaction && <PlaidTransactionCard transaction={transaction.plaid_transaction} />}
                        <div className='d-flex justify-content-center'>
                            <button onClick={() => handleEdit(transaction.id)} className='btn btn-secondary'>Edit</button>
                            <DeleteButton handleDelete={() => handleDelete(transaction.id)} warningMessage={'Are you sure you want to delete this transaction?'} />
                        </div>

                    </Item>
                </Accordion.Collapse>
            </CustomToggle>
        </div >
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
