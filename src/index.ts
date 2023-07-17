import express from "express";
import dbConnection from "./dbConnector";
const bodyParser = require("body-parser");
const cors = require("cors");
import apiRoutes from "./routes";
const graphql = require('graphql')
const {graphqlHTTP} = require('express-graphql')
const app = express();
const port = 5000;

app.use(cors());
require("dotenv").config();

dbConnection();
app.use(express.json());

app.use("/", apiRoutes);
import schema from './graphql/schema'
app.use('/graphql',graphqlHTTP((req:any,res:any)=>({
    schema,
    context:{req},
    graphiql:true,
})))

app.use(bodyParser.json({ limit: "50mb" })); // Increase the limit to allow larger payloads
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.listen(port, () => console.log(`Running on port ${port}`));
