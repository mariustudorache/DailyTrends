import * as puppeteer from "puppeteer";
import Logger from "../../core/libs/winston.logger";
import { FeedValue } from "../domain/feed.value";
import { MongoRepository } from "../infrastucture/repository/mongo.repository";
import { FeedUseCase } from "./feedUseCase";
export class WebScraper {
  private feedCasse: FeedUseCase;
  private feedRepo: MongoRepository;

  constructor() {
    this.feedRepo = new MongoRepository();
    this.feedCasse = new FeedUseCase(this.feedRepo);
  }

  crawl(
    site: any,
    classTag: string,
    titleSelector: string,
    contentSelector: string,
    linkSelector: string,
    source: string
  ) {
    (async () => {
      try {
        // Wait for browser launching.
        const browser = await puppeteer.launch();
        // Wait for creating the new page.
        const page = await browser.newPage();

        const data = await this.crawlInternal(
          page,
          site,
          classTag,
          titleSelector,
          contentSelector,
          linkSelector,
          source
        );

        browser.close();
        data.forEach((feedValue: FeedValue) => {
          this.feedCasse.saveFeed(feedValue);
        });
      } catch (error) {
        Logger.error(error);
      }
    })();
  }

  /**
   * Crawling the site recursively
   * @param page
   */
  async crawlInternal(
    page: any,
    path: string,
    classTag: string,
    titleSelector: string,
    contentSelector: string,
    linkSelector: string,
    source: string
  ) {
    try {
      await page.goto(path, { waitUntil: "networkidle2" });

      const data = await page.evaluate(
        (
          classTag: string,
          titleSelector: string,
          contentSelector: string,
          linkSelector: string,
          source: string
        ) => {
          const feeds: any = [];
          const elements = Array.from(document.querySelectorAll(classTag));

          for (const el of elements) {
            feeds.push({
              news: {
                title: el.querySelector(titleSelector)?.textContent,
                content: el.querySelector(contentSelector)?.textContent,
                link: el.querySelector(linkSelector)?.getAttribute("href"),
              },
              source: source,
            });
          }

          return feeds;
        },
        classTag,
        titleSelector,
        contentSelector,
        linkSelector,
        source
      );
      return data;
    } catch (error) {
      Logger.error(error);
    }
  }
}
