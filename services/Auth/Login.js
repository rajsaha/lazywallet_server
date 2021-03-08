import fs from "fs";
import {User} from "../../data/models/User";
import jwt from "jsonwebtoken";

const LoginService = (() => {
    const login = async (input) => {
        return new Promise((resolve, reject) => {
            try {
                const RSA_PRIVATE_KEY = fs.readFileSync(require('path').resolve(__dirname, '../../key/private.pem'));
                User.findOne({ username: input.username }, (err, doc) => {
                    if (err) reject({error: true, message: err.message});
                    if (!doc) reject({error: true, message: "Username/Password does not match"});

                    const match = doc.comparePassword(input.password, (error, match) => {
                        return match;
                    });

                    if (!match) reject({error: true, message: "Username/Password does not match"});

                    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                        algorithm: 'RS256',
                        expiresIn: "2d",
                        subject: doc._id.toString()
                    });

                    resolve({
                        email: doc.email,
                        username: doc.username,
                        token: jwtBearerToken,
                        userId: doc._id,
                        expiresIn: 172800000
                    });
                });
            } catch (err) {
                reject({error: true, message: err.message});
            }
        });
    }

    return {
        login
    }
})();

export {LoginService};
