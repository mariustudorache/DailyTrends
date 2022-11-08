import Logger from "../../../core/libs/winston.logger";
import { FeedEntity } from "../../domain/feed.entity";
import { FeedRepository } from "../../domain/feed.repository";
import FeedModel from "../model/feed.schema";
/**
 * Mongo!
 */
export class MongoRepository implements FeedRepository {
  async findFeedById(uuid: string): Promise<any> {
    try {
      Logger.debug("get news by id");
      return await FeedModel.findOne({ uuid });
    } catch (error) {
      Logger.error(error);
    }
  }
  async saveFeed(feedIn: FeedEntity): Promise<any> {
    try {
      Logger.debug("save news");

      return await FeedModel.create(feedIn);
    } catch (error) {
      Logger.error(error);
    }
  }
  async listFeeds(): Promise<any> {
    try {
      Logger.debug("list all news");
      return await FeedModel.find();
      // const date = new Date().toISOString();
      // console.log("new date = ", date);
    } catch (error) {
      Logger.error(error);
    }
  }

  async listLastFeeds(): Promise<any> {
    try {
      Logger.debug("get latest 5 news");

      let startDate = new Date();
      startDate.setUTCHours(0, 0, 0, 0);
      let endDate = new Date();
      endDate.setUTCHours(23, 59, 59, 999);

      // return await FeedModel.aggregate([
      //   { $match: { source: { $in: ["elpais", "elmundo"] } } },
      // ]).limit(5);

      return await FeedModel.find({
        createdAt: {
          $gte: startDate.toISOString(),
          $lt: endDate.toISOString(),
        },
      }).limit(5);
    } catch (error) {
      Logger.error(error);
    }
  }
}
