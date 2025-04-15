const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = shortid.generate();

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortId });
}

async function handleGetRedirectUrl(req, res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOne({ shortId });

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    // Optionally track visits
    entry.visitHistory.push({ timestamp: Date.now() });
    await entry.save();

    return res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOne({ shortId });

    return res.json({totalClicks: entry.visitHistory.length,
        analytics: entry.visitHistory,});
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
    handleGetRedirectUrl, // ✅ Export redirect handler
};
