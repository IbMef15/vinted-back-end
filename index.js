const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const usersRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");

app.use(usersRoutes);
app.use(offerRoutes);


app.all("*", () => {
    console.log("Route not found");
});

app.listen(process.env.PORT, () => {
    console.log(" 🚨🚨 Server started 🚨🚨");
})