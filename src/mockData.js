const budgetEndpoints = [
    // match /api/budgets/{id}
    {
        pattern: /budgets\/?$/, method: 'get', response: {
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
                {
                    "id": 17,
                    "category": {
                        "id": 17,
                        "category": "Subscriptions",
                        "income": false,
                        "description": "Subscriptions",
                        "is_default": false
                    },
                    "amount": "12",
                    "currency": "CAD",
                    "start_date": "2023-01"
                }
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
        pattern: /goals\/?$/, method: 'get', response: [
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
        ],
    },
    {
        pattern: /goals\/1\/?$/, method: 'get', response:
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
    },
    {
        pattern: /goals\/2\/?$/, method: 'get', response:
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
    },
]

const goalsContributionRangesEndpoints = [
    {
        pattern: /goals\/1\/contribution_ranges/, method: 'get', response: [
            {
                "id": 1,
                "start_date": "2024-08-01",
                "end_date": "2024-08-31",
                "user": 1,
                "contributions": [
                    {
                        "id": 1,
                        "amount": null,
                        "goal": {
                            "id": 4,
                            "description": "Save 1000",
                            "status": "IN_PROGRESS",
                            "is_finalized": false
                        },
                        "start_date": "2024-08-01",
                        "end_date": "2024-08-31",
                        "percentage": 100
                    }
                ]
            }
        ]
    },
    {
        pattern: /goals\/2\/contribution_ranges/, method: 'get', response: [
            {
                "id": 2,
                "start_date": "2024-07-01",
                "end_date": "2024-07-31",
                "user": 1,
                "contributions": [
                    {
                        "id": 2,
                        "amount": null,
                        "goal": {
                            "id": 4,
                            "description": "Save 1000",
                            "status": "COMPLETED",
                            "is_finalized": true
                        },
                        "start_date": "2024-07-01",
                        "end_date": "2024-07-31",
                        "percentage": 100
                    }
                ]
            }
        ]
    },
]

const transactionsEndpoints = [
    {
        pattern: /transactions\/?$/, method: 'get', response: {
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

const monthlySumamryEndpoints = [
    {
        pattern: /budgets\/summary/, method: 'get', response: [
            {
                "category": "Subscriptions",
                "budget": 12.0,
                "actual": 12.64,
                "remaining": -0.64
            },
            {
                category: "Restaurants",
                budget: 300.0,
                actual: 35.0,
                remaining: 265.0
            },
            {
                category: "Transportation",
                budget: 40.0,
                actual: 11.49,
                remaining: 28.51
            },
            {
                category: "Home",
                budget: 1500.0,
                actual: 1500.0,
                remaining: 0.0
            },
            {
                category: "Groceries",
                budget: 300.0,
                actual: 85.04,
                remaining: 214.96
            },
            {
                category: "Entertainment",
                budget: 300.0,
                actual: 50.0,
                remaining: 250.0
            },
            {
                category: "Utilities",
                budget: 150.0,
                actual: 0.0,
                remaining: 150.0
            },
            {
                category: "Sports",
                budget: 100.0,
                actual: 0.0,
                remaining: 100.0
            },
            {
                category: "Shopping",
                budget: 50.0,
                actual: 0.0,
                remaining: 50.0
            }
        ]
    },
    {
        pattern: /transactions\/summary/, method: 'get', response: {
            monthly_average: {
                income: 1475.55,
                spend: 200.0
            },
            this_month: {
                income: 2127.55,
                spend: 230.0
            },
            last_month: {
                income: 0.0,
                spend: 161.64
            }
        }
    },
    {
        pattern: /spend_by_category\/\?avg=true/, method: 'get', response: [
            {
                "category": "Subscriptions",
                average: 12.64
            },
            {
                "category": "Restaurants",
                average: 35.0
            },
            {
                "category": "Transportation",
                average: 11.49
            },
            {
                "category": "Home",
                average: 1500.0
            },
            {
                "category": "Groceries",
                average: 85.04
            },
            {
                "category": "Entertainment",
                average: 50.0
            },
            {
                "category": "Utilities",
                average: 0.0
            },
            {
                "category": "Sports",
                average: 0.0
            },
            {
                "category": "Shopping",
                average: 0.0
            }
        ]
    },
    {
        pattern: /spend_by_category\/\?monthly=true/, method: 'get', response: [
            {
                category: "Subscriptions",
                amount: 12.64,
                month: "2024-08"
            },
            {
                category: "Restaurants",
                amount: 35.0,
                month: "2024-08"
            },
            {
                category: "Transportation",
                amount: 11.49,
                month: "2024-08"
            },
            {
                category: "Home",
                amount: 1500.0,
                month: "2024-08"
            },
            {
                category: "Groceries",
                amount: 85.04,
                month: "2024-08"
            },
            {
                category: "Entertainment",
                amount: 50.0,
                month: "2024-08"
            },
            {
                category: "Utilities",
                amount: 0.0,
                month: "2024-08"
            },
            {
                category: "Sports",
                amount: 0.0,
                month: "2024-08"
            },
            {
                category: "Shopping",
                amount: 0.0,
                month: "2024-08"
            }
        ]
    },
]

const historicalSummaryEndpoints = [
    {
        pattern: /spend_vs_income_by_month/, method: 'get', response: [
            {
                "month": "2024-04",
                "spend": 3000.0,
                "income": 3505.55
            },
            {
                "month": "2024-05",
                "spend": 3200,
                "income": 3000.55
            },
            {
                "month": "2024-06",
                "spend": 5000.0,
                "income": 3700.55
            },
            {
                "month": "2024-07",
                "spend": 2300.0,
                "income": 2127.55
            },
            {
                "month": "2024-08",
                "spend": 1610.64,
                "income": 3000.0
            }
        ]
    },
    {
        pattern: /spend_by_category\/?$/, method: 'get', response: [
            {
                "category": "Subscriptions",
                "amount": 12.64
            },
            {
                "category": "Restaurants",
                "amount": 35.0
            },
            {
                "category": "Transportation",
                "amount": 11.49
            },
            {
                "category": "Home",
                "amount": 1500.0
            },
            {
                "category": "Groceries",
                "amount": 85.04
            },
            {
                "category": "Entertainment",
                "amount": 50.0
            },
            {
                "category": "Utilities",
                "amount": 0.0
            },
            {
                "category": "Sports",
                "amount": 0.0
            },
            {
                "category": "Shopping",
                "amount": 0.0
            }
        ]
    },
    {
        pattern: /spend_by_category\/?monthly=true/, method: 'get', response: [
            {
                "category": "Subscriptions",
                "month": "2024-08",
                "total": 12.64
            },
            {
                "category": "Restaurants",
                "month": "2024-08",
                "total": 35.0
            },
            {
                "category": "Transportation",
                "month": "2024-08",
                "total": 11.49
            },
            {
                "category": "Home",
                "month": "2024-08",
                "total": 1500.0
            },
            {
                "category": "Groceries",
                "month": "2024-08",
                "total": 85.04
            },
            {
                "category": "Entertainment",
                "month": "2024-08",
                "total": 50.0
            },
            {
                "category": "Utilities",
                "month": "2024-08",
                "total": 0.0
            },
            {
                "category": "Sports",
                "month": "2024-08",
                "total": 0.0
            },
            {
                "category": "Shopping",
                "month": "2024-08",
                "total": 0.0
            },
            {
                "category": "Subscriptions",
                "month": "2024-07",
                "total": 20.64
            },
            // invent some data for previous months
            {
                "category": "Restaurants",
                "month": "2024-07",
                "total": 35.0
            },
            {
                "category": "Transportation",
                "month": "2024-07",
                "total": 11.49
            },
            {
                "category": "Home",
                "month": "2024-07",
                "total": 1500.0
            },
            {
                "category": "Groceries",
                "month": "2024-07",
                "total": 85.04
            },
            {
                "category": "Entertainment",
                "month": "2024-07",
                "total": 50.0
            },
            {
                "category": "Utilities",
                "month": "2024-07",
                "total": 0.0
            },
            {
                "category": "Sports",
                "month": "2024-07",
                "total": 0.0
            },
            {
                "category": "Shopping",
                "month": "2024-07",
                "total": 0.0
            },
            {
                "category": "Subscriptions",
                "month": "2024-06",
                "total": 12.64
            },
            {
                "category": "Restaurants",
                "month": "2024-06",
                "total": 35.0
            },
            {
                "category": "Transportation",
                "month": "2024-06",
                "total": 11.49
            },
            {
                "category": "Home",
                "month": "2024-06",
                "total": 1500.0
            },
            {
                "category": "Groceries",
                "month": "2024-06",
                "total": 85.04
            },
            {
                "category": "Entertainment",
                "month": "2024-06",
                "total": 50.0
            },
            {
                "category": "Utilities",
                "month": "2024-06",
                "total": 0.0
            },
            {
                "category": "Sports",
                "month": "2024-06",
                "total": 0.0
            },
            {
                "category": "Shopping",
                "month": "2024-06",
                "total": 0.0
            },
            {
                "category": "Subscriptions",
                "month": "2024-05",
                "total": 12.64
            },
            {
                "category": "Restaurants",
                "month": "2024-05",
                "total": 35.0
            },
            {
                "category": "Transportation",
                "month": "2024-05",
                "total": 11.49
            },
            {
                "category": "Home",
                "month": "2024-05",
                "total": 1500.0
            },
            {
                "category": "Groceries",
                "month": "2024-05",
                "total": 85.04
            },
            {
                "category": "Entertainment",
                "month": "2024-05",
                "total": 50.0
            },
            {
                "category": "Utilities",
                "month": "2024-05",
                "total": 0.0
            },
            {
                "category": "Sports",
                "month": "2024-05",
                "total": 0.0
            },
            {
                "category": "Shopping",
                "month": "2024-05",
                "total": 0.0
            },
            {
                "category": "Subscriptions",
                "month": "2024-04",
                "total": 12.64
            },
            {
                "category": "Restaurants",
                "month": "2024-04",
                "total": 35.0
            },
            {
                "category": "Transportation",
                "month": "2024-04",
                "total": 11.49
            },
            {
                "category": "Home",
                "month": "2024-04",
                "total": 1500.0
            },
            {
                "category": "Groceries",
                "month": "2024-04",
                "total": 85.04
            },
            {
                "category": "Entertainment",
                "month": "2024-04",
                "total": 50.0
            },
            {
                "category": "Utilities",
                "month": "2024-04",
                "total": 0.0
            },
            {
                "category": "Sports",
            }
        ]
    }
]

// Mock data for demo user for each endpoint
export const mockData = [
    ...budgetEndpoints,
    ...categoriesEndpoints,
    ...currenciesEndpoints,
    ...goalsEndpoints,
    ...transactionsEndpoints,
    ...goalsContributionRangesEndpoints,
    ...monthlySumamryEndpoints,
    ...historicalSummaryEndpoints,
]