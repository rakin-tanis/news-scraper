import { getMonth } from '../utils/months'
import { scrapTopics } from "../utils/scrapTopics";
import {
  FormatTopic,
  Selectors,
  Publisher,
  Locale
} from '../utils/types'


const dateParser = (date: string) => {
  const [day, month, year, dayStr, time] = date.split(' ')
  return `${year}-${getMonth(month)}-${day}T${time}`
}

const getAktifHaber = async () => {
  const url = new URL('https://aktifhaber.com')

  const rawTopicsSelectors: Selectors = {
    wrapper: 'div[data-image-small]',
    link: 'a',
  }

  const topicSelectors: Selectors = {
    wrapper: "body",
    title: 'meta[property="og:title"]',
    description: 'meta[property="og:description"]',
    image: 'meta[property="og:image"]',
    time: "div.detail-left time",
    categories: "#navigation ul li a.active",
  };

  const formatTopic: FormatTopic = ({ rawTopic, topicItem }) => {
    // TODO: Confirm if there is time difference because of timezone
    const time = rawTopic.time
      ? new Date(dateParser(rawTopic.time)).toDateString()
      : '';

    return {
      ...rawTopic,
      url: topicItem?.url ?? "",
      time,
    };
  }

  return await scrapTopics({
    publisher: Publisher.AKTIF_HABER,
    locale: Locale.TR,
    url,
    rawTopicsSelectors,
    topicSelectors,
    formatTopic
  });
}

export default getAktifHaber
