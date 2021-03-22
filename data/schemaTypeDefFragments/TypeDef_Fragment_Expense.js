const Fragment_Expense = `
    type Expenses {
        expenses: [ExpensesWrapper]
        count: [_count]
        total: [_Total]
        dates: [_Date]
    }
    
    type _Total {
        total: Int
    }

    type ExpensesWrapper {
        _id: Date
        records: [_Expense]
    }

    type _Date {
        _id: Date
    }
    
    type _Expense {
        _id: ID
        typeId: [Int]
        typeDesc: [String]
        title: String
        amount: Int
        timestamp: Date
        dateCreatedAt: Date
    }
    
    type ExpenseInputReturn {
        _id: ID
        typeId: ID
        userId: ID
        title: String
        amount: Int
        timestamp: Date
    }
    
    input _New_ExpenseInput {
        userId: ID
        typeId: ID
        title: String
        amount: Int
    }
    
    input _Update_ExpenseInput {
        id: ID
        userId: ID
        typeId: ID
        title: String
        amount: Int
    }
    
    input _Delete_ExpenseInput {
        id: ID,
        userId: ID
    }
`;

export { Fragment_Expense };
