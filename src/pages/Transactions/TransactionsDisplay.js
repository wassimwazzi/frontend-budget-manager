import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Item from '../../components/Item'
import { DeleteButton } from '../../components/ActionButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill1Wave, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons'

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
                            <p>Description: {transaction.description}</p>
                            <p>Inferred Category: {transaction.inferred_category ? 'Yes' : 'No'}</p>
                            <button onClick={() => handleEdit(transaction.id)} className='btn btn-secondary'>Edit</button>
                            <DeleteButton handleDelete={() => handleDelete(transaction.id)} />
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
