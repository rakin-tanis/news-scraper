import { scrapTopics } from "../utils/scrapTopics";
import { FormatTopic, Locale, Publisher, Selectors } from "../utils/types"

const getVolkskrantNews = async () => {
  const url = new URL('https://www.volkskrant.nl/nieuws')

  const rawTopicsSelectors: Selectors = {
    wrapper: 'article.fjs-teaser-compact.teaser--compact',
    link: 'a',
    image: 'a>img.teaser__image--compact.fjs-teaser-image',
  }

  const topicSelectors: Selectors = {
    wrapper:
      "article.artstyle.artstyle--type-default.fu--type-default.artstyle--padding-top-s-l.fu--padding-top-s-l",
    title: "h1.artstyle__header-title",
    description: "header.artstyle__header p.artstyle__intro",
    image: "img.artstyle__image",
    time: "time.artstyle__production__datetime",
    categories: "h4.artstyle__labels",
  };

  const formatTopic: FormatTopic = ({ rawTopic, topicItem }) => {
    // TODO time has to be fixed
    const time = topicItem?.time ? new Date(topicItem.time).toString() : "";

    return {
      ...(topicItem ?? rawTopic),
      title: topicItem?.title?.replace(/\n/g, "").trim(),
      description: topicItem?.description
        ?.replace(/\n/g, "")
        .replace(/  +/g, " ")
        .trim(),
      url: rawTopic.url,
      image: rawTopic.image,
      time,
    };
  }

  return await scrapTopics({
    publisher: Publisher.VOLKSKRANT,
    locale: Locale.NL,
    url,
    rawTopicsSelectors,
    topicSelectors,
    formatTopic
  });

}

export default getVolkskrantNews;