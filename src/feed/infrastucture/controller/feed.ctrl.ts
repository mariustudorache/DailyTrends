import Logger from "../../../core/libs/winston.logger";
import { FeedUseCase } from "../../application/feedUseCase";
import { MongoRepository } from "../repository/mongo.repository";

export class FeedController {
  private feedUseCase: FeedUseCase;
  private feedRepo: MongoRepository;
  constructor() {
    this.feedRepo = new MongoRepository();
    this.feedUseCase = new FeedUseCase(this.feedRepo);
    this.insertCtrl = this.insertCtrl.bind(this);
    this.getFeedDetails = this.getFeedDetails.bind(this);
    this.getLastFeeds = this.getLastFeeds.bind(this);
  }

  public async getFeedDetails(uuid: string): Promise<any | null> {
    try {
      return await this.feedUseCase.getFeedDetail(uuid);
    } catch (error) {
      Logger.error(`FeedController ${error}`);
    }
  }

  public async getLastFeeds(): Promise<Array<any>> {
    try {
      return await this.feedUseCase.getLastFeeds();
      // res.send({ feeds });
    } catch (error) {
      Logger.error(`FeedController ${error}`);
    }
  }

  public async insertCtrl(body: any): Promise<any> {
    try {
      return await this.feedUseCase.saveFeed(body);
    } catch (error) {
      Logger.error(`FeedController ${error}`);
    }
  }
}
