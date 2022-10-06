import { scrapTopics } from "../utils/scrapTopics";
import { FormatTopic, Locale, Publisher, Selectors } from "../utils/types"

const getNosNews = async () => {
  const url = new URL("https://nos.nl/nieuws");

  const rawTopicsSelectors: Selectors = {
    wrapper: 'ul.list-items.padded-small li.list-items__item',
    title: 'h3.list-items__title',
    description: 'p.list-items__description',
    link: 'a.list-items__link',
    image: 'img.list-items__image',
    time: 'time.list-items__time',
    categories: 'span.list-items__category',
  }

  const formatTopic: FormatTopic = ({ rawTopic, topicItem }) => {
    const categories = rawTopic.categories?.flatMap((category: string) =>
      category
        .replace(/in/g, '')
        .replace(/\n/, '')
        .split(',')
        .flatMap((item: string) => item.trim()),
    )

    return {
      ...rawTopic,
      categories,
    }
  }

  return await scrapTopics({
    publisher: Publisher.NOS,
    locale: Locale.NL,
    url,
    rawTopicsSelectors,
    formatTopic,
  });
}

export default getNosNews;
