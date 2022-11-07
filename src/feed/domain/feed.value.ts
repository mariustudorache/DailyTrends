import { v4 as uuid } from "uuid";
import { FeedEntity } from "./feed.entity";
import { NewsEntity } from "./news.entity";

export class FeedValue implements FeedEntity {
  uuid: string;
  news: NewsEntity;
  source: string;

  constructor({ source, news }) {
    this.uuid = uuid();
    this.source = source ?? "default";
    this.news = news;
  }
}
