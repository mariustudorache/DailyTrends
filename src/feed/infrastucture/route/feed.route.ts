import { Router } from "express";
import { FeedUseCase } from "../../application/feedUseCase";
import { FeedController } from "../controller/feed.ctrl";
import { MongoRepository } from "../repository/mongo.repository";

const route = Router();
/**
 * Iniciar Repository
 */
const feedRepo = new MongoRepository();

/**
 * Iniciamos casos de uso
 */

const feedUseCase = new FeedUseCase(feedRepo);

/**
 * Iniciar Feed Controller
 */

const feedCtrl = new FeedController(feedUseCase);

/**
 *
 */

route.post(`/feed`, feedCtrl.insertCtrl);
route.get(`/feed`, feedCtrl.getLastFeeds);
route.get(`/feed/:uuid`, feedCtrl.getFeedDetails);

export default route;
