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
        pattern: /categories*paginate=true/, method: 'get', response: {
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
                "expected_completion_date": new Date().toISOString().split('T')[0],
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
                        "start_date": startOfMonth().format('YYYY-MM-DD'),
                        "end_date": endOfMonth().format('YYYY-MM-DD'),
                        "percentage": 50
                    }
                ]
            },
            {
                "id": 2,
                "amount": "1000.00",
                "expected_completion_date": lastMonth().format('YYYY-MM-DD'),
                "actual_completion_date": null,
                "progress": -100,
                "total_contributed": -1000,
                "type": "SAVINGS",
                "description": "Save 1000",
                "status": "FAILED",
                "start_date": lastMonth().format('YYYY-MM-DD'),
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
                        "start_date": lastMonth().format('YYYY-MM-DD'),
                        "end_date": lastMonth().format('YYYY-MM-DD'),
                        "percentage": 100
                    }
                ]
            },
        ]
    },
]
// Mock data for demo user for each endpoint
export const mockData = [
    ...budgetEndpoints,
    ...categoriesEndpoints,
    ...currenciesEndpoints,
]