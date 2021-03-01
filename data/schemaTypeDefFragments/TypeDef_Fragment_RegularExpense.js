const Fragment_RegularExpense = `
    type Day {
        value: String
        selected: Boolean
    }
    
    type RegularExpense {
        regExpenses: [_RegExpenses],
        count: [_count]
    }
    
    type _RegExpenses {
        _id: ID
        typeId: [Int]
        typeDesc: [String]
        title: String
        amount: Int
        repeat: Boolean
        time: String
        days: [Day]
        timestamp: String
    }
    
    type _count {
        id: String
        count: Int
    }
    
    type RegularExpenseInputReturn {
        _id: ID
        typeId: ID
        userId: ID
        title: String
        amount: Int
        repeat: Boolean
        time: String
        days: [Day]
        timestamp: String
    }
    
    input DayInput {
        value: String
        selected: Boolean
    }
    
    input _New_RegularExpenseInput {
        userId: ID
        typeId: ID
        title: String
        amount: Int
        repeat: Boolean
        time: String
        days: [DayInput]
    }
    
    input _Update_RegularExpenseInput {
        id: ID
        userId: ID
        typeId: ID
        title: String
        amount: Int
        repeat: Boolean
        time: String
        days: [DayInput]
    }
    
    input _Delete_RegularExpenseInput {
        id: ID,
        userId: ID
    }
`;

export {Fragment_RegularExpense};
