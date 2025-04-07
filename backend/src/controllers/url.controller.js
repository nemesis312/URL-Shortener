const urlService = require("../services/url.service");
const db = require("../db/knex");

async function shortenUrl(req, res) {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: "originalUrl is required" });
  }

  try {
    const shortCode = await urlService.createShortUrl(originalUrl);
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function redirectToOriginal(req, res) {
  const { shortCode } = req.params;

  try {
    const result = await urlService.getOriginalUrl(shortCode);

    if (!result) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    await db("short_urls")
      .where({ short_code: shortCode })
      .increment("clicks", 1);

    res.redirect(result.original_url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {
  shortenUrl,
  redirectToOriginal,
};
