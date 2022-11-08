import "dotenv/config";
import express from "express";
import cors from "express";
import feedRoute from "./infrastucture/route/feed.route";
import dbInit from "./infrastucture/db/mongo";
import Logger from "../core/libs/winston.logger";
import { PeriodicTask } from "../core/libs/cron";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.use(feedRoute);
dbInit().then();

const cron = new PeriodicTask();
cron.startCronJob();

app.listen(port, () =>
  Logger.debug(`Server is up and running @ http://localhost:${port}`)
);
