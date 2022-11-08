import { CronJob } from "cron";
import { WebScraper } from "../../feed/application/feedScraper";
import Logger from "./winston.logger";

export class PeriodicTask {
  cronJob: CronJob;
  feedScraper: WebScraper;

  constructor() {
    this.feedScraper = new WebScraper();
  }

  async startCronJob(): Promise<void> {
    try {
      Logger.debug(`start a new cron job`);
      this.cronJob = new CronJob("*/10 * * * *", async () => {
        try {
          await this.scrapFeedPagesJob();
        } catch (error) {
          Logger.error(`Cron error ${error}`);
        }
      });

      // Start job
      if (!this.cronJob.running) {
        this.cronJob.start();
      }
    } catch (error) {}
  }

  async scrapFeedPagesJob(): Promise<void> {
    Logger.debug(`scrap news pages`);

    //scrap elpais feed data
    this.feedScraper.crawl(
      "https://elpais.com/ultimas-noticias/",
      "#fusion-app > main > div.z.z-te > section > div > div.b-st_a > article",
      ".c_t",
      "p",
      "header > h2 > a",
      "elpais"
    );

    // scrap elmundo feed data
    try {
      this.feedScraper.crawl(
        "https://www.elmundo.es/ultimas-noticias.html",
        "div:nth-child(6) > div > div > div > div > div.ue-l-cover-grid__column.size8of12 > div",
        "article > div > div.ue-c-cover-content__main > header > a > h2",
        "article > div > div.ue-c-cover-content__main > header > a > h2",
        "article > div > div.ue-c-cover-content__main > header > a",
        "elmundo"
      );
    } catch (error) {
      Logger.error(`scrapFeedPagesJob ${error}`);
    }
  }
}
