import { FeedEntity } from "./feed.entity";

export interface FeedRepository {
  findFeedById(uuid: string): Promise<any | null>;
  saveFeed(feed: FeedEntity): Promise<FeedEntity | null>;
  listFeeds(): Promise<FeedEntity[] | null>;
  listLastFeeds(): Promise<FeedEntity[] | null>;
}
