import { scrapTopics } from "../utils/scrapTopics";
import { Locale, Publisher, Topic, FormatTopic, Selectors } from '../utils/types'

const getBoldMedya = async () => {
  const url = new URL('https://boldmedya.com')

  const rawTopicsSelectors: Selectors = {
    wrapper: 'article.jeg_post',
    link: 'h2.jeg_post_title a',
  }

  const topicSelectors: Selectors = {
    wrapper: 'div.jeg_inner_content',
    title: 'meta[property="og:title"]',
    description: 'meta[property="og:description"]',
    image: 'meta[property="og:image"]',
    time: 'div.jeg_meta_date a',
    categories: 'span.breadcrumb_last_link a',
  }

  const formatTopic: FormatTopic = ({ rawTopic, topicItem }) => {
    let time = ''

    if (topicItem?.time) {
      const dateParts = topicItem?.time?.split('/')
      // TODO: Confirm if there is time difference because of timezone
      time = new Date(
        +dateParts[2],
        +dateParts[1] - 1,
        +dateParts[0]
      ).toString();
    }

    return {
      ...(topicItem ?? rawTopic),
      url: rawTopic.url,
      time,
    };
  }

  return await scrapTopics({
    publisher: Publisher.BOLD_MEDYA,
    locale: Locale.TR,
    url,
    rawTopicsSelectors,
    topicSelectors,
    formatTopic
  });
}

export default getBoldMedya
