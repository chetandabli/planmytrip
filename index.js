const express = require("express");
const app = express();
require('dotenv').config()
const { connection } = require("./configs/db");
const { postRouter } = require("./routes/post")

app.use(express.json());

app.get("/", (req, res)=>{
    res.end("react app home page");
})

app.use("/api", postRouter)

app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("db connected!")
    } catch (error) {
        console.log(error)
    }

    console.log("app is running...")
})