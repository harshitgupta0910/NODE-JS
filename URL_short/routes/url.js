const express = require("express");
const {
    handleGenerateNewShortUrl,
    handleGetRedirectUrl,
    handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get("/:shortId", handleGetRedirectUrl); // ✅ Add this

router.get('/analytics/:shortId',handleGetAnalytics)

module.exports = router;
