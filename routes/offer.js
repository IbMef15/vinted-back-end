const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");

const Offer = require("../models/offer");
const isAuthenticated = require("../middlewares/isAuthenticated");

const convertToBase64 = (file) => {
    return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

router.post("/offer/publish", isAuthenticated, fileUpload(), async (req, res) => {
    try {
        console.log(req.headers.authorization);
        const { title, description, price, condition, city, brand, size, color } = req.body;

        const newOffer = new Offer({
            product_name: title,
            product_description: description,
            product_price: price,
            product_details: [
                {
                    MARQUE: brand
                },
                {
                    TAILLE: size
                },
                {
                    ÉTAT: condition
                },
                {
                    COULEUR: color
                },
                {
                    EMPLACEMENT: city
                }
            ],
            owner: req.user, //reference to user

        });

        const result = await cloudinary.uploader.upload(convertToBase64(req.files.picture));
        newOffer.product_image = result;
        await newOffer.save();
        res.status(200).json(newOffer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;