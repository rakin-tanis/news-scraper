import { load } from 'cheerio'
import axios from 'axios'
import { ScrapPage, Topic } from './types'

export const scrapPage: ScrapPage = async ({
  publisher,
  locale,
  selectors,
  url,
  proxy = '',
  headers,
}) => {
  try {
    console.log(`${url} news fetching...`);
    
    const mainUrl = `${proxy}${url}`;
    const config = { headers };
    const response = await axios.get(mainUrl, config);
    
    const $ = load(response.data);

    const wrapper = $(selectors.wrapper);

    const result = wrapper
      .map((_, el) => {
        const topic: Topic = { url: url.toString(), publisher, locale };
        const { title, description, image, imageAttr, categories, time, link } =
          selectors;

        if (link) {
          const urlText = $(el).find(link).attr("href");
          if (!urlText) {
            console.log(
              "News skipped. There is no url in the selector!",
              `publisher: ${publisher}`
            );
            return null;
          }
          // const urlObj = new URL(url);
          topic.url = urlText?.startsWith("https")
            ? urlText
            : url.origin + urlText;
        }

        if (title) {
          topic.title = $(el).find(title).text();
        }

        if (description) {
          topic.description = $(el).find(description).text();
        }

        if (categories) {
          const category = $(el).find(categories).text();
          topic.categories = [category];
        }

        if (image) {
          const imageSrcset = $(el).find(image).attr("srcset");
          const imageText = $(el)
            .find(image)
            .attr(imageAttr ?? "src");
          const img = imageSrcset
            ? imageSrcset.trim().split(",")[0].split(" ")[0]
            : imageText;
          // const urlObj = new URL(url);
          topic.image = !img
            ? ""
            : img.startsWith("http")
            ? img
            : url.origin + "/" + img;
        }

        if (time) {
          const timeDateTime = $(el).find(time).attr("datetime");
          const timeText = $(el).find(time).text();
          topic.time = timeDateTime || timeText;
        }

        return topic;
      })
      .get();

    console.log(`${url} news fetched.`);
    return result;
  } catch (error: any) {
    console.log({
      publisher,
      locale,
      url,
      time: new Date().toDateString(),
      type: "SCRAPING ERROR",
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      // data: error?.response?.data,
    });
    return [
      <Topic>{
        publisher,
        locale,
        url: url.toString(),
        categories: ["SCRAPING ERROR"],
        time: new Date().toDateString(),
        title: "ERROR",
        description: "An error ocurred while scraping topics from : " + url,
      },
    ];
  }
}