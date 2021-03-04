const Fragment_Expense = `
    type _Expense {
        _id: ID
        typeId: [Int]
        typeDesc: [String]
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

export {Fragment_Expense};
