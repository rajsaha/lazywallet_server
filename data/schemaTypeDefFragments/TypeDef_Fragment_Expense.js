const Fragment_Expense = `
    type Expenses {
        expenses: [_Expense]
        count: [_count]
        total: [_total]
    }
    
    type _total {
        total: Int
    }
    
    type _Expense {
        _id: ID
        typeId: [Int]
        typeDesc: [String]
        title: String
        amount: Int
        timestamp: Date
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
