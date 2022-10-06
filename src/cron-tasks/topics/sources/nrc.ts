import { scrapTopics } from "../utils/scrapTopics";
import { FormatTopic, Locale, Publisher, Selectors } from "../utils/types"

const getNrcNews = async () => {
  const url = new URL('https://www.nrc.nl/nieuws')

  const rawTopicsSelectors: Selectors = {
    wrapper: 'div.nmt-item',
    link: 'a.nmt-item__link',
    image: 'img[style=max-width:100%]',
    categories: 'h6.nmt-item__flag',
  }

  const topicSelectors: Selectors = {
    wrapper: "div.article__header-and-content",
    title: "h1[data-flowtype=headline]",
    description: "div.intro.article__intro",
    image: "", // TODO needs an image tag
    time: "time.article__byline__text",
    categories: "div.breadcrumb div.wrap",
  };

  const formatTopic: FormatTopic = ({ rawTopic, topicItem }) => {
    const categories = rawTopic.categories?.map(cat =>
      cat?.replace(/\n/g, '').replace(/\t/, '').trim(),
    )

    const time = topicItem?.time ? new Date(topicItem.time).toString() : "";

    return {
      ...(topicItem ?? rawTopic),
      url: rawTopic.url,
      categories,
      time,
    }
  }

  return await scrapTopics({
    publisher: Publisher.NRC,
    locale: Locale.NL,
    url,
    rawTopicsSelectors,
    topicSelectors,
    formatTopic
  });


}

export default getNrcNews;