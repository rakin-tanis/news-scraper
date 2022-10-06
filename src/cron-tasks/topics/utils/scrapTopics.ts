import { scrapPage } from "./scrapPage";
import { ScrapTopics, Topic } from "./types";

/** 
  The scraping topic can compose of one or two stages, some sites provide all the 
  required information for our topic object (url, title, description, categories, 
  image, time) on the front page. For those sites, scraping consists of a single 
  stage, and you just need to provide @rawTopicSelectors to the scrapTopic Api.

  However some other sites don't provide every detail on the front page, so to fully 
  populate the topic object we need to make an extra request to the detail page and 
  scrap the details. So you need the provide @topicSelector as an extra. topicSelector 
  is an optional parameter if you don't provide it to the API, API will treat it is 
  a single-stage scraping.

  @publisher, @locale, and @url are the mandatory parameters for both single-stage 
  and two-stage scraping. you can use @proxy and @headers if you need.

  @formatTopic is a mandatory callback function that lets you format the topic scraped 
  from the site
*/
export const scrapTopics: ScrapTopics = async ({
  publisher,
  locale,
  url,
  rawTopicsSelectors,
  topicSelectors,
  proxy,
  headers,
  formatTopic,
}) => {
  /**
    First stage of scraping. It gets raw topic from front page of the site. Most of 
    the time some of the part of the topic object are missing so we need to send 
    another request to the news detail page to fulfill the topic object.
  */
  const rawTopics = await scrapPage({
    publisher,
    locale,
    selectors: rawTopicsSelectors,
    url,
  });
  console.log("Total " + rawTopics.length + " raw topic fetched from " + url);

  /** result array will contain the fulfilled topic objects. */
  const result: Topic[] = [];

  /** 
   If the @topicSelector parameter don't provided to the API, it means it is 
   single-stage scraping, all the information are on the front page. It 
   formats the topics and return it.
  */
  if (!topicSelectors) {
    rawTopics.map((rawTopic) => {
      const formattedTopic = formatTopic({ rawTopic });
      result.push(formattedTopic);
    });

    return result;
  }

  /**
    If it is two-stage scraping after getting URLs of news from the front page, 
    we sent requests for the details one by one, and then format responses and 
    turn a fully populated topic list. we don't send the request asynchronous 
    way to the same domain so that not to be blocked by the source.
  */
  for (const rawTopic of rawTopics) {
    try {
      const detailedTopics = await scrapPage({
        publisher: rawTopic.publisher,
        locale: rawTopic.locale,
        url: new URL(rawTopic.url),
        selectors: topicSelectors,
        proxy,
        headers,
      });

      const detailedTopic = detailedTopics?.[0];
      if (detailedTopic) {
        const formattedTopic = formatTopic({
          rawTopic,
          topicItem: detailedTopic,
        });
        result.push(formattedTopic);
      }
    } catch (error) {
      console.error(rawTopic, error);
    }
  }

  console.log("Total " + result.length + " topic(s) fetched from " + url);

  return result;
};