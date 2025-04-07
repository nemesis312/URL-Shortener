const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const urlRoutes = require("./routes/url.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(express.json());
// RUTA DE DOCUMENTACIÓN
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});
