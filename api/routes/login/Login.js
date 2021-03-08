import express from "express";
const loginRouter = express.Router();
import {LoginService} from "../../../services/Auth/Login";

loginRouter.post("/login", async (req, res) => {
   try {
       const response = await LoginService.login({username: req.body.username, password: req.body.password});
       res.json(response);
   } catch (err) {
       res.error();
   }
});

export {loginRouter};
