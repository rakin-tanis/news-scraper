import { scrapTopics } from "../utils/scrapTopics";
import { FormatTopic, Locale, Publisher, Selectors } from "../utils/types"

const getNuNews = async () => {
  const url = new URL('https://nu.nl/net-binnen')

  const rawTopicsSelectors: Selectors = {
    wrapper: '.block.articlelist:not(.dispnone) li.list__item--thumb',
    title: 'span.item-title__title',
    link: 'a.list__link',
    image: 'img.item-thumb__image',
    time: '.title-wrapper span.item-title__meta', // TODO need fix
  }

  const topicSelectors: Selectors = {
    wrapper: "div.column-content.clearfix",
    title: "figcaption.headerimage__overlay",
    description: "p.excerpt",
    image: "figure.headerimage__image img.image",
    time: "span.pubdate.large", // TODO need fix
  };

  const formatTopic: FormatTopic = ({ rawTopic, topicItem }) => {
    const title = (topicItem?.title || rawTopic?.title)
      ?.replace(/\n/g, "")
      .trim();

    const description = topicItem?.description || rawTopic.description

    const time = topicItem?.time
      ? new Date(topicItem.time).toString()
      : rawTopic.time;

    const categories = rawTopic.time?.split("-")
      ? [rawTopic.time?.split("-")[1].trim()]
      : [];

    return {
      ...(topicItem ?? rawTopic),
      title,
      description,
      url: rawTopic.url,
      time,
      categories,
    };
  }

  return await scrapTopics({
    publisher: Publisher.NU,
    locale: Locale.NL,
    url,
    rawTopicsSelectors,
    topicSelectors,
    formatTopic
  });

}

export default getNuNews;