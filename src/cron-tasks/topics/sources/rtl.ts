import { scrapTopics } from "../utils/scrapTopics";
import { FormatTopic, Locale, Publisher, Selectors } from "../utils/types"

const getRtlNews = async () => {
  const url = new URL('https://www.rtlnieuws.nl/net-binnen')

  const rawTopicsSelectors: Selectors = {
    wrapper: 'div.large-4.medium-4.small-12.columns.relative.grid-block',
    title: 'h2.js_title',
    link: 'a.js_link.image-block-link',
    image: 'img.js_image.js_lazy_image',
    time: 'span.time.time--inline',
    categories: 'span.js_label.chapeau.chapeau-chapeau',
  }

  const topicSelectors: Selectors = {
    wrapper: 'article[role=article]',
    title: 'h1.node-title',
    description: 'p.lede',
    image: 'div.large-12.medium-12.article-header-width.row img',
    time: 'span.time.time-created',
    categories: 'span.js_label.chapeau.chapeau-sectionname.chapeau-on-img',
  }

  const formatTopic: FormatTopic = ({ rawTopic, topicItem }) => {
    const categories = (
      topicItem?.categories?.[0] ? topicItem.categories : rawTopic.categories
    )?.flatMap((cat) => cat.split(",").map((c) => c.trim()));

    // TODO time format required

    return {
      ...(topicItem ?? rawTopic),
      url: rawTopic.url,
      categories,
    };
  }

  return await scrapTopics({
    publisher: Publisher.RTL,
    locale: Locale.NL,
    url,
    rawTopicsSelectors,
    topicSelectors,
    formatTopic,
  });

}

export default getRtlNews;
