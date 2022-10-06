import { scrapTopics } from "../utils/scrapTopics";
import { FormatTopic, Locale, Publisher, Selectors } from "../utils/types";

const getAmnesty = async () => {
  const url = new URL("https://www.amnesty.nl/nieuws");

  const rawTopicsSelectors: Selectors = {
    wrapper: "article.teaser",
    title: "h3.teaser__title",
    description: "p.teaser__description",
    link: "a.teaser__link",
    image: "div.teaser__image img",
    imageAttr: "data-src",
    time: "span.teaser__note.teaser__note--date",
    categories: "p.teaser__category",
  };

  const formatTopic: FormatTopic = ({ rawTopic, topicItem }) => {
    // TODO: Confirm if there is time difference because of timezone
    // TODO: Time comes in Dutch (5 oktober 2022)! It has to be converted to english.
    const time = rawTopic?.time ? new Date(rawTopic.time).toString() : "";

    const categories = rawTopic.categories?.map((category) =>
      category
        .replace(/\n/g, "")
        .replace(rawTopic.time ? rawTopic.time : "", "")
        .trim()
    );

    return {
      ...rawTopic,
      categories,
      time,
    };
  };

  return await scrapTopics({
    publisher: Publisher.AMNESTY,
    locale: Locale.NL,
    url,
    rawTopicsSelectors,
    formatTopic,
  });
};

export default getAmnesty;
