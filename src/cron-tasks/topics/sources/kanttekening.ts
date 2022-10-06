import { scrapTopics } from "../utils/scrapTopics";
import { FormatTopic, Publisher, Locale, Selectors } from '../utils/types'

const getKanttekeningNews = async () => {
  const url = new URL('https://dekanttekening.nl')
  
  const rawTopicsSelectors: Selectors = {
    wrapper: "h3.entry-title.td-module-title",
    link: "a",
  };

  const topicSelectors: Selectors = {
    wrapper: 'div.tdc_zone.tdi_59.wpb_row.td-pb-row',
    title: 'h1.tdb-title-text',
    description: 'p span', // TODO needs some improvements
    image: 'img.entry-thumb',
    time: 'time[datetime]',
    categories: 'ul.td-category li.entry-category a', // TODO not working, needs update
  }

  const formatTopic: FormatTopic = ({ rawTopic, topicItem }) => {
    const time = topicItem?.time ? new Date(topicItem.time).toString() : "";

    return {
      ...(topicItem ?? rawTopic),
      // description: topicItem.description?.substring(0, 150),
      // url: topicItem.url,
      time,
    };
  }

  return await scrapTopics({
    publisher: Publisher.KATTENKENING,
    locale: Locale.NL,
    url,
    rawTopicsSelectors,
    topicSelectors,
    formatTopic
  });
}

export default getKanttekeningNews;
