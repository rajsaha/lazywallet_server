import express from "express";
const signupRouter = express.Router();
import {SignupService} from "../../../services/Signup/Signup";

signupRouter.post("/signup", async (req, res) => {
    try {
        const response = await SignupService.signup({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        res.json(response);
    } catch (err) {
        res.error();
    }
});

export {signupRouter};
