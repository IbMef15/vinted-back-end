const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/vinted");

const usersRoutes = require("./routes/user");
app.use(usersRoutes);


app.all("*", () => {
    console.log("route not found");
});

app.listen(3000, () => {
    console.log(" 🚨🚨 Server started 🚨🚨");
})