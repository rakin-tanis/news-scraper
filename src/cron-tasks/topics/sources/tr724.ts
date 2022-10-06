import { scrapTopics } from "../utils/scrapTopics";
import { FormatTopic, Locale, Publisher, Selectors } from "../utils/types"

const getTr724News = async () => {
  const url = new URL('https://www.tr724.com')
  
  const rawTopicsSelectors: Selectors = {
    wrapper: 'div.swiper-slide',
    link: 'a',
    image: 'a img.carousel__image',
  }

  const topicSelectors: Selectors = {
    wrapper: 'article.post',
    title: 'h1.entry-title',
    description: 'p span', // TODO needs some improvements
    image: 'img.entry-thumb',
    time: 'time[datetime]',
    categories: 'ul.td-category li.entry-category a', // TODO needs some improvements
  }

  const formatTopic: FormatTopic = ({ rawTopic, topicItem }) => {
    const time = topicItem?.time ? new Date(topicItem.time).toString() : "";

    return {
      ...(topicItem ?? rawTopic),
      description: topicItem?.description?.substring(0, 150),
      url: rawTopic.url,
      time,
    };
  }

  return await scrapTopics({
    publisher: Publisher.TR724,
    locale: Locale.TR,
    url,
    rawTopicsSelectors,
    topicSelectors,
    formatTopic
  });

}

export default getTr724News;