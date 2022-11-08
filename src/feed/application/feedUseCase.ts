import Logger from "../../core/libs/winston.logger";
import { FeedRepository } from "../domain/feed.repository";
import { FeedValue } from "../domain/feed.value";

export class FeedUseCase {
  constructor(private readonly feedRepository: FeedRepository) {}

  public async saveFeed({ source, news }) {
    try {
      const feedValue = new FeedValue({ source, news });
      return await this.feedRepository.saveFeed(feedValue);
    } catch (error) {
      Logger.error(error);
    }
  }

  public getFeedDetail = async (uuid: string) => {
    try {
      return await this.feedRepository.findFeedById(uuid);
    } catch (error) {
      Logger.error(error);
    }
  };

  public getLastFeeds = async () => {
    try {
      return await this.feedRepository.listLastFeeds();
    } catch (error) {
      Logger.error(error);
    }
  };

  public getAllFeeds = async () => {
    try {
      return await this.feedRepository.listFeeds();
    } catch (error) {
      Logger.error(error);
    }
  };
}
