const express = require("express");
const router = express.Router();


const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

User = require("../models/User");

router.post("/user/signup", async (req, res) => {
    try {
        const password = req.body.password;
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(16);
        existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.json("The email already exists.");
        }
        if (!req.body.username) {
            return res.json("username not defined")
        }
        const newUser = new User({
            account: {
                username: req.body.username,
            },
            email: req.body.email,
            hash: hash,
            salt: salt,
            token: token,
        });
        await newUser.save();
        res.status(200).json({
            _id: newUser.id,
            token: token,
            account: {
                username: req.body.username,
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/user/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.json({ message: "user's not existing, you want to create a compte" });
        } else {
            const salt = existingUser.salt;
            const hash = SHA256(password + salt).toString(encBase64);
            const token = uid2(16);

            if (hash !== existingUser.hash) {
                return res.json({ message: "password not valid" });
            } else {
                return res.status(200).json({
                    _id: existingUser.id,
                    token: token,
                    account: {
                        username: existingUser.account.username,
                    }
                });
            }
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/user/offer/publish", async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;