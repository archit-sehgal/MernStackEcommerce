const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");
const allRouter = require("./routes/all");
const app = express();

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use("/admin", adminRouter)
app.use("/", allRouter);


// connect to mongodb
mongoose.connect("mongodb+srv://architsehgal:Architgr8@test.hnsjox4.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


const Port = process.env.port || 8080;

app.listen(Port, () => {
    console.log("Server started on port " + Port);
});