import express from "express";

let indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/", (req, res, next) => {
  res.send("Graphql");
});

module.exports = indexRouter;
