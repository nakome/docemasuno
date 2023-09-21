import Express from "express";
import { Deta } from "deta";
import {marked} from "marked";
const deta = Deta();
const db = deta.Base("bins");
const app = Express();

/**
 *
 * Share code by key
 */
app.get("/share/:key", async (req, res) => {
  try {
    const bin = await db.get(req.params.key);
    if (bin && bin.published) {
      if(bin.category === "markdown") {
        bin.content = marked.parse(bin.content);
      }
      res.render("index", {
        baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`,
        data: bin,
      });
    } else {
      res.render("error", {
        baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`,
        data: []
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

/**
 * Get code raw
 */
app.get("/raw/:key", async (req, res) => {
  try {
    const bin = await db.get(req.params.key);
    if (bin && bin.published) {
      // Establecer el encabezado Content-Type en "text/plain"
      res.setHeader("Content-Type", "text/plain");
      // Enviar el texto como respuesta
      res.send(bin.content);
    }else {
      res.render("error", {
        baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

export default app;