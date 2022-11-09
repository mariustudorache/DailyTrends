import { Router } from "express";
import { FeedController } from "../controller/feed.ctrl";

const route = Router();

/**
 * Iniciar Feed Controller
 */

const feedCtrl = new FeedController();

/**
 *
 */

route.get("/feeds", async (_req, res) => {
  const response = await feedCtrl.getLastFeeds();
  return res.send(response);
});

route.post("/feeds", async (req, res) => {
  const response = await feedCtrl.insertCtrl(req.body);
  return res.send(response);
});

route.get("/feeds/:id", async (req, res) => {
  const response = await feedCtrl.getFeedDetails(req.params.id);
  if (!response) res.status(404).send({ message: "No feed found" });
  return res.send(response);
});

// route.post(`/feed`, feedCtrl.insertCtrl);
// route.get(`/feed`, feedCtrl.getLastFeeds);
// route.get(`/feed/:uuid`, feedCtrl.getFeedDetails);

export default route;
