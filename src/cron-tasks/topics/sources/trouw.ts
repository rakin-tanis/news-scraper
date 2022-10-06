import { scrapTopics } from "../utils/scrapTopics";
import { FormatTopic, Locale, Publisher, Selectors } from "../utils/types"

const getTrouwNews = async () => {
  const url = new URL('https://www.trouw.nl/nieuws')

  const rawTopicsSelectors: Selectors = {
    wrapper: 'article.fjs-teaser-compact.teaser--compact-reverse',
    link: 'a.teaser__link',
    image: 'a img.teaser__image--compact.fjs-teaser-image',
    categories: 'header span.teaser__label.teaser__label--compact',
  }

  const topicSelectors: Selectors = {
    wrapper: 'article.artstyle',
    title: 'h1.artstyle__header-title',
    description: 'section.artstyle__main p.artstyle__paragraph',
    image: 'img.artstyle__image',
    time: 'time.artstyle__production__datetime',
    categories: 'h4.artstyle__labels ',
  }

  const formatTopic: FormatTopic = ({ rawTopic, topicItem }) => {
    const title = topicItem?.title
      ?.replace(/\n/g, "")
      .replace(/  +/g, " ")
      .trim();
    const description = topicItem?.description
      ?.replace(/\n/g, "")
      .replace(/  +/g, " ")
      .trim()
      .substring(0, 150);

    // TODO time comes in Dutch(6 oktober 2022), it has to be converted Eng before this line
    const time = topicItem?.time ? new Date(topicItem.time).toString() : "";

    return {
      ...(topicItem ?? rawTopic),
      title,
      description,
      url: rawTopic.url,
      image: topicItem?.image ?? rawTopic.image,
      categories: topicItem?.categories ?? rawTopic.categories,
      time,
    };
  }

  return await scrapTopics({
    publisher: Publisher.TROUW,
    locale: Locale.NL,
    url,
    rawTopicsSelectors,
    topicSelectors,
    formatTopic
  });

}

export default getTrouwNews;
