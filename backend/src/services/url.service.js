const db = require("../db/knex");
const { nanoid } = require("nanoid");

async function createShortUrl(originalUrl) {
  const shortCode = nanoid(6);

  await db("short_urls").insert({
    original_url: originalUrl,
    short_code: shortCode,
  });

  return shortCode;
}

async function getOriginalUrl(shortCode) {
  return db("short_urls").where({ short_code: shortCode }).first();
}

module.exports = {
  createShortUrl,
  getOriginalUrl,
};
