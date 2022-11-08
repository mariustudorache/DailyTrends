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
      return await FeedModel.findOne({ uuid });
    } catch (error) {
      Logger.error(error);
    }
  }
  async saveFeed(feedIn: FeedEntity): Promise<any> {
    try {
      return await FeedModel.create(feedIn);
    } catch (error) {
      Logger.error(error);
    }
  }
  async listFeeds(): Promise<any> {
    try {
      return await FeedModel.find({});
    } catch (error) {
      Logger.error(error);
    }
  }

  async listLastFeeds(): Promise<any> {
    try {
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
