const express = require('express');
const connectDB = require('./connect'); // ✅ No destructuring here
const URL = require('./models/url'); // ✅ Correct import
const urlRoute = require('./routes/url');
const { handleGetRedirectUrl } = require('./controllers/url');
const app = express();
const port = 3000;

connectDB("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("Connected to MongoDB");

    app.use(express.json());

    app.use("/url", urlRoute);

    app.get("/:shortId", async (req, res) => {
      const  shortId  = req.params.shortId;
      const entry = await URL.findOneAndUpdate({
        shortId,
      },
    {
      push:{
        visitHistory:{timestamp: Date.now()},
      },
    });
    res.redirect(entry.redirectUrl)
    });


    app.listen(port, () => {
      console.log(`Server is running at PORT ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
