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

const TransactionsDisplay = ({ transactions, handleDelete, handleEdit }) => {

    const TransactionItem = ({ transaction, id }) => (
        <div className='p-3' style={{ overflow: 'scroll' }}>
            <Item>
                <CustomToggle eventKey={id}>
                    <div className='d-flex justify-content-between'>
                        <div style={{ flex: 1 }}>
                            <IncomeOrExpenseIcon income={transaction.category.income} />
                        </div>
                        <h5 style={{ flex: 1 }}>{transaction.date}</h5>
                        <h5 style={{ flex: 1 }}>{transaction.category.category}</h5>
                        <p style={{ flex: 1 }}>{transaction.code}</p>
                        <div style={{ flex: 1 }} className='d-flex'>
                            <h5 >{transaction.amount}</h5>
                            <p style={{ marginLeft: '0.5rem' }}>{transaction.currency}</p>
                        </div>
                    </div>
                    <Accordion.Collapse eventKey={id}>
                        <>
                            <div style={{ borderTop: '1px solid #dee2e6' }}>
                                <div className='d-flex justify-content-around' style={{ marginTop: '1rem' }}>
                                    {transaction.description && <p>Description: {transaction.description}</p>}
                                    {transaction.inferred_category && <InferredCategoryPill />}
                                    {transaction.file && <div><FontAwesomeIcon icon={faFileImport} size='1x' /> {transaction.file.file}</div>}
                                </div>
                            </div>
                            {transaction.plaid_transaction && <PlaidTransactionCard transaction={transaction.plaid_transaction} />}
                            <div className='d-flex justify-content-center'>
                                <button onClick={() => handleEdit(transaction.id)} className='btn btn-secondary'>Edit</button>
                                <DeleteButton handleDelete={() => handleDelete(transaction.id)} warningMessage={'Are you sure you want to delete this transaction?'} />
                            </div>

                        </>
                    </Accordion.Collapse>
                </CustomToggle>
            </Item>
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
