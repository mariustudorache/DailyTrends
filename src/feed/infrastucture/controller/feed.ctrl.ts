import { Request, Response } from "express";
import Logger from "../../../core/libs/winston.logger";
import { FeedUseCase } from "../../application/feedUseCase";

export class FeedController {
  constructor(private feedUseCase: FeedUseCase) {
    this.insertCtrl = this.insertCtrl.bind(this);
    this.getFeedDetails = this.getFeedDetails.bind(this);
    this.getLastFeeds = this.getLastFeeds.bind(this);
  }

  public async getFeedDetails({ query }: Request, res: Response) {
    try {
      const { uuid = "" } = query;
      const feed = await this.feedUseCase.getFeedDetail(`${uuid}`);
      res.send({ feed });
    } catch (error) {
      Logger.error(`FeedController ${error}`);
    }
  }

  public async getLastFeeds(req: Request, res: Response) {
    try {
      const feeds = await this.feedUseCase.getLastFeeds();
      res.send({ feeds });
    } catch (error) {
      Logger.error(`FeedController ${error}`);
    }
  }

  public async insertCtrl({ body }: Request, res: Response) {
    try {
      const feed = await this.feedUseCase.saveFeed(body);
      res.send({ feed });
    } catch (error) {
      Logger.error(`FeedController ${error}`);
    }
  }
}
