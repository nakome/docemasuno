import Express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import cors from "cors";

import GetRoutes from "./routes/getRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Express();

// Configurar el motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Utiliza path.join()

app.use(Express.json({limit: "20mb", extended: true}));
app.use(Express.urlencoded({limit: "20mb", extended: true, parameterLimit: 50000}))

app.use(cors());
app.use(Express.static("public"));

app.use("/", GetRoutes);

const port = process.env.PORT || 8080;

// Start server
app.listen(port, () => {
  console.log(`backend running on port ${port}!`);
});
