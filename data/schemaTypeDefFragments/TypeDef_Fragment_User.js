const Fragment_User = `
    type User {
        email: String
        username: String
        password: String
    }
    
    type UserInputReturn {
        email: String
        username: String
    }
    
    input _New_UserInput {
        email: String
        username: String
        password: String
    }`;

export {Fragment_User};
