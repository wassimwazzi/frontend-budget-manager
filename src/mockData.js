const budgetEndpoints = [
    // match /api/budgets/{id}
    {
        pattern: /budgets/, method: 'get', response: {
            "count": 8,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 21,
                    "category": {
                        "id": 14,
                        "category": "Home",
                        "income": false,
                        "description": "Rent / Items for home",
                        "is_default": false
                    },
                    "amount": "1500.00",
                    "currency": "CAD",
                    "start_date": "2023-01"
                },
                {
                    "id": 6,
                    "category": {
                        "id": 17,
                        "category": "Restaurants",
                        "income": false,
                        "description": "",
                        "is_default": false
                    },
                    "amount": "300.00",
                    "currency": "CAD",
                    "start_date": "2023-01"
                },
                {
                    "id": 7,
                    "category": {
                        "id": 12,
                        "category": "Groceries",
                        "income": false,
                        "description": "Groceries",
                        "is_default": false
                    },
                    "amount": "300.00",
                    "currency": "CAD",
                    "start_date": "2023-01"
                },
                {
                    "id": 14,
                    "category": {
                        "id": 7,
                        "category": "Entertainment",
                        "income": false,
                        "description": "Entertainment",
                        "is_default": false
                    },
                    "amount": "300.00",
                    "currency": "CAD",
                    "start_date": "2023-01"
                },
                {
                    "id": 15,
                    "category": {
                        "id": 23,
                        "category": "Utilities",
                        "income": false,
                        "description": "Utilities",
                        "is_default": false
                    },
                    "amount": "150.00",
                    "currency": "CAD",
                    "start_date": "2023-01"
                },
                {
                    "id": 10,
                    "category": {
                        "id": 19,
                        "category": "Sports",
                        "income": false,
                        "description": "Sports",
                        "is_default": false
                    },
                    "amount": "100.00",
                    "currency": "CAD",
                    "start_date": "2023-01"
                },
                {
                    "id": 12,
                    "category": {
                        "id": 4,
                        "category": "Shopping",
                        "income": false,
                        "description": "Shopping",
                        "is_default": false
                    },
                    "amount": "50.00",
                    "currency": "CAD",
                    "start_date": "2023-01"
                },
                {
                    "id": 9,
                    "category": {
                        "id": 21,
                        "category": "Transportation",
                        "income": false,
                        "description": "Transportation",
                        "is_default": false
                    },
                    "amount": "40.00",
                    "currency": "CAD",
                    "start_date": "2023-01"
                },
            ],
            "total_pages": 1
        },
    },
]

const categoriesEndpoints = [
    // match /api/categories
    {
        pattern: /categories\/$/, method: 'get', response: {
            "count": 10,
            "next": null,
            "previous": null,
            "total_pages": 1,
            "results": [
                {
                    "id": 1,
                    "category": "Other Income",
                    "income": true,
                    "description": "Income",
                    "is_default": true
                },
                {
                    "id": 1,
                    "category": "Other Expense",
                    "income": true,
                    "description": "Expense",
                    "is_default": true
                },
                {
                    "id": 14,
                    "category": "Home",
                    "income": false,
                    "description": "Rent / Items for home",
                    "is_default": false
                },
                {
                    "id": 17,
                    "category": "Restaurants",
                    "income": false,
                    "description": "",
                    "is_default": false
                },
                {
                    "id": 12,
                    "category": "Groceries",
                    "income": false,
                    "description": "Groceries",
                    "is_default": false
                },
                {
                    "id": 7,
                    "category": "Entertainment",
                    "income": false,
                    "description": "Entertainment",
                    "is_default": false
                },
                {
                    "id": 23,
                    "category": "Utilities",
                    "income": false,
                    "description": "Utilities",
                    "is_default": false
                },
                {
                    "id": 19,
                    "category": "Sports",
                    "income": false,
                    "description": "Sports",
                    "is_default": false
                },
                {
                    "id": 4,
                    "category": "Shopping",
                    "income": false,
                    "description": "Shopping",
                    "is_default": false
                },
                {
                    "id": 21,
                    "category": "Transportation",
                    "income": false,
                    "description": "Transportation",
                    "is_default": false
                },
            ],
        },
    },
    {
        pattern: /categories.*paginate=false/, method: 'get', response: [
            {
                "id": 1,
                "category": "Other Income",
                "income": true,
                "description": "Income",
                "is_default": true
            },
            {
                "id": 2,
                "category": "Other Expense",
                "income": true,
                "description": "Expense",
                "is_default": true
            },
            {
                "id": 14,
                "category": "Home",
                "income": false,
                "description": "Rent / Items for home",
                "is_default": false
            },
            {
                "id": 17,
                "category": "Restaurants",
                "income": false,
                "description": "",
                "is_default": false
            },
            {
                "id": 12,
                "category": "Groceries",
                "income": false,
                "description": "Groceries",
                "is_default": false
            },
            {
                "id": 7,
                "category": "Entertainment",
                "income": false,
                "description": "Entertainment",
                "is_default": false
            },
            {
                "id": 23,
                "category": "Utilities",
                "income": false,
                "description": "Utilities",
                "is_default": false
            },
            {
                "id": 19,
                "category": "Sports",
                "income": false,
                "description": "Sports",
                "is_default": false
            },
            {
                "id": 4,
                "category": "Shopping",
                "income": false,
                "description": "Shopping",
                "is_default": false
            },
            {
                "id": 21,
                "category": "Transportation",
                "income": false,
                "description": "Transportation",
                "is_default": false
            },
        ],
    },
]

const currenciesEndpoints = [
    {
        pattern: /currencies/, method: 'get', response: [{ "code": "CAD" }, { "code": "LBP" }, { "code": "EUR" }, { "code": "USD" }, { "code": "GBP" }]
    }
]

const goalsEndpoints = [
    {
        pattern: /goals/, method: 'get', response: [
            {
                "id": 1,
                "amount": "1000.00",
                // set completion date to end of month dynamically
                "expected_completion_date": '2024-08-31',
                "actual_completion_date": null,
                "progress": 50,
                "total_contributed": 500,
                "type": "SAVINGS",
                "description": "save 1000$ a month",
                "status": "IN_PROGRESS",
                "start_date": null,
                "recurring": "FIXED",
                "recurring_frequency": 1,
                "contributions": [
                    {
                        "id": 1,
                        "amount": "0.00",
                        "goal": {
                            "id": 1,
                            "description": "save 1000$ a month",
                            "status": "IN_PROGRESS",
                            "is_finalized": false
                        },
                        "start_date": '2024-08-01',
                        "end_date": '2024-08-31',
                        "percentage": 100
                    }
                ]
            },
            {
                "id": 2,
                "amount": "1000.00",
                "expected_completion_date": '2024-07-31',
                "actual_completion_date": null,
                "progress": 100,
                "total_contributed": 1000,
                "type": "SAVINGS",
                "description": "Save 1000",
                "status": "COMPLETED",
                "start_date": '2024-07-01',
                "recurring": "FIXED",
                "recurring_frequency": 1,
                "contributions": [
                    {
                        "id": 2,
                        "amount": "0.00",
                        "goal": {
                            "id": 2,
                            "description": "Save 1000",
                            "status": "FAILED",
                            "is_finalized": true
                        },
                        "start_date": '2024-07-01',
                        "end_date": '2024-07-31',
                        "percentage": 100
                    }
                ]
            },
        ]
    },
]

const transactionsEndpoints = [
    {
        pattern: /transactions/, method: 'get', response: {
            "count": 10,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 1095,
                    "code": "UBER CANADA/UBE _V",
                    "amount": "11.49",
                    "currency": "CAD",
                    "date": "2024-08-06",
                    "description": "Uber",
                    "category": {
                        "id": 22,
                        "category": "Transportation",
                        "income": false,
                        "description": "Transportation",
                        "is_default": false
                    },
                    "inferred_category": true,
                    "file": null,
                    "plaid_transaction": {
                        "id": 37,
                        "location": {
                            "id": 3,
                            "address": null,
                            "city": "Montreal",
                            "region": "QC",
                            "postal_code": null,
                            "country": "Canada"
                        },
                        "account": {
                            "account_id": "",
                            "mask": "0433",
                            "name": "My Bank CHEQUING ACCOUNT",
                            "official_name": "My Bank",
                            "subtype": "checking",
                            "type": "depository",
                            "iso_currency_code": null,
                            "available_balance": null,
                            "current_balance": null,
                            "limit": null,
                            "max_lookback_date": null,
                            "item": "",
                        },
                        "item_sync": {
                            "id": 4,
                            "item": {
                                "item_id": "",
                                "access_token": "",
                                "institution_id": "my_ins",
                                "institution_name": "My Bank",
                                "max_lookback_date": "2024-05-28",
                                "last_cursor": "",
                            },
                            "last_synced": "2024-08-09T00:23:47.986137Z",
                            "last_failed": null,
                            "failed_attempts": 0,
                            "cursor": ""
                        },
                        "category": [
                            "Travel",
                            "Taxi"
                        ],
                        "plaid_transaction_id": "",
                        "category_id": "22016000",
                        "name": "UBER CANADA/UBE _V",
                        "pending": false,
                        "status": "ADDED"
                    }
                },
                {
                    "id": 1096,
                    "code": "My Restaurant",
                    "amount": "35.00",
                    "currency": "CAD",
                    "date": "2024-08-06",
                    "description": null,
                    "category": {
                        "id": 3,
                        "category": "Restaurant",
                        "income": true,
                        "description": "No specific category",
                        "is_default": true
                    },
                    "inferred_category": true,
                    "file": null,
                    "plaid_transaction": {
                        "id": 38,
                        "location": {
                            "id": 3,
                            "address": null,
                            "city": "Montreal",
                            "region": "QC",
                            "postal_code": null,
                            "country": "Canada"
                        },
                        "account": {
                            "account_id": "",
                            "mask": "0433",
                            "name": "My Bank CHEQUING ACCOUNT",
                            "official_name": "My Bank",
                            "subtype": "checking",
                            "type": "depository",
                            "iso_currency_code": null,
                            "available_balance": null,
                            "current_balance": null,
                            "limit": null,
                            "max_lookback_date": null,
                            "item": "",
                        },
                        "item_sync": {
                            "id": 4,
                            "item": {
                                "item_id": "",
                                "access_token": "",
                                "institution_id": "my_ins",
                                "institution_name": "My Bank",
                                "max_lookback_date": "2024-05-28",
                                "last_cursor": "",
                            },
                            "last_synced": "2024-08-09T00:23:47.986137Z",
                            "last_failed": null,
                            "failed_attempts": 0,
                            "cursor": ""
                        },
                        "category": [
                            "Restaurant",
                            "Food"
                        ],
                        "plaid_transaction_id": "",
                        "category_id": "21009000",
                        "name": "My Restaurant",
                        "pending": false,
                        "status": "ADDED"
                    }
                },
                {
                    "id": 1097,
                    "code": "Spotify",
                    "amount": "12.64",
                    "currency": "CAD",
                    "date": "2024-08-06",
                    "description": "Spotify",
                    "category": {
                        "id": 20,
                        "category": "Subscriptions",
                        "income": false,
                        "description": "Subscriptions, e.g. Netflix",
                        "is_default": false
                    },
                    "inferred_category": true,
                    "file": null,
                    "plaid_transaction": {
                        "id": 39,
                        "location": {
                            "id": 3,
                            "address": null,
                            "city": "Montreal",
                            "region": "QC",
                            "postal_code": null,
                            "country": "Canada"
                        },
                        "account": {
                            "account_id": "",
                            "mask": "0433",
                            "name": "My Bank CHEQUING ACCOUNT",
                            "official_name": "My Bank Chequing Account",
                            "subtype": "checking",
                            "type": "depository",
                            "iso_currency_code": null,
                            "available_balance": null,
                            "current_balance": null,
                            "limit": null,
                            "max_lookback_date": null,
                            "item": "",
                        },
                        "item_sync": {
                            "id": 4,
                            "item": {
                                "item_id": "",
                                "access_token": "",
                                "institution_id": "my_ins",
                                "institution_name": "My Bank",
                                "max_lookback_date": "2024-05-28",
                                "last_cursor": "",
                            },
                            "last_synced": "2024-08-09T00:23:47.986137Z",
                            "last_failed": null,
                            "failed_attempts": 0,
                            "cursor": ""
                        },
                        "category": [
                            "Service",
                            "Subscription"
                        ],
                        "plaid_transaction_id": "",
                        "category_id": "18061000",
                        "name": "Spotify",
                        "pending": false,
                        "status": "ADDED"
                    }
                },
                {
                    "id": 1098,
                    "code": "Domino's",
                    "amount": "25.92",
                    "currency": "CAD",
                    "date": "2024-08-06",
                    "description": "Domino's",
                    "category": {
                        "id": 17,
                        "category": "Restaurants",
                        "income": false,
                        "description": "",
                        "is_default": false
                    },
                    "inferred_category": true,
                    "file": null,
                    "plaid_transaction": {
                        "id": 40,
                        "location": {
                            "id": 3,
                            "address": null,
                            "city": "Montreal",
                            "region": "QC",
                            "postal_code": null,
                            "country": "Canada"
                        },
                        "account": {
                            "account_id": "",
                            "mask": "0433",
                            "name": "My Bank CHEQUING ACCOUNT",
                            "official_name": "My Bank Chequing Account",
                            "subtype": "checking",
                            "type": "depository",
                            "iso_currency_code": null,
                            "available_balance": null,
                            "current_balance": null,
                            "limit": null,
                            "max_lookback_date": null,
                            "item": "",
                        },
                        "item_sync": {
                            "id": 4,
                            "item": {
                                "item_id": "",
                                "access_token": "",
                                "institution_id": "my_ins",
                                "institution_name": "My Bank",
                                "max_lookback_date": "2024-05-28",
                                "last_cursor": "",
                            },
                            "last_synced": "2024-08-09T00:23:47.986137Z",
                            "last_failed": null,
                            "failed_attempts": 0,
                            "cursor": ""
                        },
                        "category": [
                            "Food and Drink",
                            "Restaurants",
                            "Fast Food"
                        ],
                        "plaid_transaction_id": "",
                        "category_id": "13005032",
                        "name": "Domino's",
                        "pending": false,
                        "status": "ADDED"
                    }
                },
                {
                    "id": 1093,
                    "code": "SEND E-TFR",
                    "amount": "1500",
                    "currency": "CAD",
                    "date": "2024-08-01",
                    "description": null,
                    "category": {
                        "id": 14,
                        "category": "Home",
                        "income": false,
                        "description": "Items for home",
                        "is_default": false
                    },
                    "inferred_category": true,
                    "file": null,
                    "plaid_transaction": {
                        "id": 35,
                        "location": {
                            "id": 3,
                            "address": null,
                            "city": "Montreal",
                            "region": "QC",
                            "postal_code": null,
                            "country": "Canada"
                        },
                        "account": {
                            "account_id": "",
                            "mask": "0433",
                            "name": "My Bank CHEQUING ACCOUNT",
                            "official_name": "My Bank Chequing Account",
                            "subtype": "checking",
                            "type": "depository",
                            "iso_currency_code": null,
                            "available_balance": null,
                            "current_balance": null,
                            "limit": null,
                            "max_lookback_date": null,
                            "item": "",
                        },
                        "item_sync": {
                            "id": 4,
                            "item": {
                                "item_id": "",
                                "access_token": "",
                                "institution_id": "my_ins",
                                "institution_name": "My Bank",
                                "max_lookback_date": "2024-05-28",
                                "last_cursor": "",
                            },
                            "last_synced": "2024-08-09T00:23:47.986137Z",
                            "last_failed": null,
                            "failed_attempts": 0,
                            "cursor": ""
                        },
                        "category": [
                            "Transfer",
                            "Debit"
                        ],
                        "plaid_transaction_id": "",
                        "category_id": "21006000",
                        "name": "SEND E-TFR ***Wyh",
                        "pending": false,
                        "status": "ADDED"
                    }
                },
                {
                    "id": 1079,
                    "code": "My Company Pay",
                    "amount": "2127.55",
                    "currency": "CAD",
                    "date": "2024-07-31",
                    "description": "My Company",
                    "category": {
                        "id": 1,
                        "category": "Salary",
                        "income": true,
                        "description": "Salary",
                        "is_default": false
                    },
                    "inferred_category": true,
                    "file": null,
                    "plaid_transaction": {
                        "id": 32,
                        "location": {
                            "id": 3,
                            "address": null,
                            "city": "Montreal",
                            "region": "QC",
                            "postal_code": null,
                            "country": "Canada"
                        },
                        "account": {
                            "account_id": "",
                            "mask": "0433",
                            "name": "My Bank CHEQUING ACCOUNT",
                            "official_name": "My Bank Chequing Account",
                            "subtype": "checking",
                            "type": "depository",
                            "iso_currency_code": null,
                            "available_balance": null,
                            "current_balance": null,
                            "limit": null,
                            "max_lookback_date": null,
                            "item": "",
                        },
                        "item_sync": {
                            "id": 3,
                            "item": {
                                "item_id": "",
                                "access_token": "",
                                "institution_id": "my_ins",
                                "institution_name": "My Bank",
                                "max_lookback_date": "2024-05-28",
                                "last_cursor": "",
                            },
                            "last_synced": "2024-08-01T21:04:03.307340Z",
                            "last_failed": null,
                            "failed_attempts": 0,
                            "cursor": ""
                        },
                        "category": [
                            "Transfer",
                            "Payroll"
                        ],
                        "plaid_transaction_id": "",
                        "category_id": "21009000",
                        "name": "My Companyy",
                        "pending": false,
                        "status": "ADDED"
                    }
                },
                {
                    "id": 1090,
                    "code": "My grocery store",
                    "amount": "59.79",
                    "currency": "CAD",
                    "date": "2024-07-31",
                    "description": "Groceries",
                    "category": {
                        "id": 13,
                        "category": "Groceries",
                        "income": false,
                        "description": "",
                        "is_default": false
                    },
                    "inferred_category": false,
                    "file": null,
                    "plaid_transaction": null
                },
                {
                    "id": 1091,
                    "code": "GROCERY STORE",
                    "amount": "25.25",
                    "currency": "CAD",
                    "date": "2024-07-31",
                    "description": "",
                    "category": {
                        "id": 12,
                        "category": "Groceries",
                        "income": false,
                        "description": "Groceries",
                        "is_default": false
                    },
                    "inferred_category": false,
                    "file": null,
                    "plaid_transaction": null
                },
                {
                    "id": 1092,
                    "code": "My favorite bar",
                    "amount": "50",
                    "currency": "CAD",
                    "date": "2024-07-31",
                    "description": "Night out",
                    "category": {
                        "id": 11,
                        "category": "Entertainment",
                        "income": false,
                        "description": "Entertainment",
                        "is_default": false
                    },
                    "inferred_category": true,
                    "file": 'file_upload.csv',
                    "plaid_transaction": null
                },
                {
                    "id": 1077,
                    "code": "My favorite restaurant",
                    "amount": "230",
                    "currency": "CAD",
                    "date": "2024-07-30",
                    "description": "Dinner",
                    "category": {
                        "id": 16,
                        "category": "Restaurant",
                        "income": false,
                        "description": "Restaurant",
                        "is_default": true
                    },
                    "inferred_category": true,
                    "file": null,
                    "plaid_transaction": {
                        "id": 30,
                        "location": {
                            "id": 3,
                            "address": null,
                            "city": "Montreal",
                            "region": "QC",
                            "postal_code": null,
                            "country": "Canada"
                        },
                        "account": {
                            "account_id": "",
                            "mask": "0433",
                            "name": "My Bank CHEQUING ACCOUNT",
                            "official_name": "My Bank Chequing Account",
                            "subtype": "checking",
                            "type": "depository",
                            "iso_currency_code": null,
                            "available_balance": null,
                            "current_balance": null,
                            "limit": null,
                            "max_lookback_date": null,
                            "item": "",
                        },
                        "item_sync": {
                            "id": 3,
                            "item": {
                                "item_id": "",
                                "access_token": "",
                                "institution_id": "my_ins",
                                "institution_name": "My Bank",
                                "max_lookback_date": "2024-05-28",
                                "last_cursor": "",
                            },
                            "last_synced": "2024-08-01T21:04:03.307340Z",
                            "last_failed": null,
                            "failed_attempts": 0,
                            "cursor": ""
                        },
                        "category": [
                            "Restaurant",
                            "Food"
                        ],
                        "plaid_transaction_id": "",
                        "category_id": "21006000",
                        "name": "My fav restaurant",
                        "pending": false,
                        "status": "ADDED"
                    }
                }
            ],
            "total_pages": 1
        }
    },
]
// Mock data for demo user for each endpoint
export const mockData = [
    ...budgetEndpoints,
    ...categoriesEndpoints,
    ...currenciesEndpoints,
    ...goalsEndpoints,
    ...transactionsEndpoints,
]