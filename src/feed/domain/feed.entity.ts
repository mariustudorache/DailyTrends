import { NewsEntity } from "./news.entity";

export interface FeedEntity {
  uuid: string;
  news: NewsEntity;
  source: string;
}
