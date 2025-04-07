const express = require("express");
const router = express.Router();
const {
  shortenUrl,
  redirectToOriginal,
} = require("../controllers/url.controller");

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Crea una URL corta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: https://openai.com
 *     responses:
 *       200:
 *         description: URL corta generada
 */
router.post("/shorten", shortenUrl);
/**
 * @swagger
 * /{shortCode}:
 *   get:
 *     summary: Redirige a la URL original
 *     parameters:
 *       - name: shortCode
 *         in: path
 *         required: true
 *         description: Código corto de la URL
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirección a la URL original
 */
router.get("/:shortCode", redirectToOriginal);

module.exports = router;
