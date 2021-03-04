const express = require("express");
const imgurService = require("../services/imgurService");
const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        console.log(req);
        res.status(201).json(await imgurService.upload(req.body));

    } catch (e) {
        next(e);
    }
});

module.exports = router;