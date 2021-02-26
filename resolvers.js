const regExpensesDb = {};
class regExpense {
    constructor(id, {type, amount, repeat, time, days}) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.repeat = repeat;
        this.time = time;
        this.days = days;
    }
}
const resolvers = {
    getRegularExpense: ({id}) => {
        return new regExpense(id, regExpensesDb[id]);
    },
    createRegularExpense: ({input}) => {
        let id = require('crypto').randomBytes(10).toString('hex');
        regExpensesDb[id] = input;
        return new regExpense(id, input);
    }
};

export default resolvers;
