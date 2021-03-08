import fs from "fs";
const expressJwt = require('express-jwt');

const RSA_PUBLIC_KEY = fs.readFileSync(require('path').resolve(__dirname, '../../key/public.pem'));

const checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ['RS256']
});

export {checkIfAuthenticated};
