import express from "express";
import bodyParser from "body-parser";
import getNews from "./cron-tasks/topics";
import { strapi } from ".//mock/strapi";

const app = express();
const PORT = 6000;

app.use(bodyParser.json());

app.use("/news", async (req, res) => {
  const result = await getNews({ strapi });
  res.send(result);

});


app.get("/", (req, res) => res.send("Welcome to the News API!"));
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));