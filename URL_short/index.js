const express = require('express');
const path = require('path');
const connectDB = require('./connect');
const URL = require('./models/url');
const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Set view engine and views directory
    app.set("view engine", "ejs");
    app.set("views", path.resolve("./views"));

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Static files (if needed)
    app.use(express.static(path.join(__dirname, 'public'))); // Optional

    // Test route to list all URLs
    app.get("/test", async (req, res) => {
      try {
        const allUrls = await URL.find({});
        return res.render("home", { urls: allUrls });
      } catch (err) {
        console.error("Error fetching URLs:", err);
        return res.status(500).send("Internal Server Error");
      }
    });

    // Use defined routers
    app.use("/url", urlRoute);
    app.use("/", staticRouter);

    // Route to handle short URL redirection
    app.get("/:shortId", async (req, res) => {
      const { shortId } = req.params;

      try {
        const entry = await URL.findOneAndUpdate(
          { shortId },
          {
            $push: {
              visitHistory: { timestamp: Date.now() },
            },
          }
        );

        if (!entry) {
          return res.status(404).send("Short URL not found");
        }

        return res.redirect(entry.redirectUrl);
      } catch (err) {
        console.error("Error redirecting:", err);
        return res.status(500).send("Internal Server Error");
      }
    });

    // Start server
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });
