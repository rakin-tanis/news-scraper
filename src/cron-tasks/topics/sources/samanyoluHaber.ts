import { scrapTopics } from "../utils/scrapTopics";
import { FormatTopic, Locale, Publisher, Selectors } from "../utils/types"
import { getMonth } from "../utils/months"; 

const getSamanyoluNews = async () => {
  const url = new URL('https://www.samanyoluhaber.com')
  const rawTopicsSelectors: Selectors = {
    wrapper: 'div.slider.main-slider.sh-slider.ana-manset div.item',
    link: 'a',
    image: 'a>img',
  }

  const topicSelectors: Selectors = {
    wrapper: 'div.samanyolu',
    title: 'h1.page-title',
    description: 'h2.page-summary',
    image: '',
    time: 'div.breadcrumb div.wrap',
    categories: 'div.breadcrumb div.wrap',
  }

  const formatTopic: FormatTopic = ({ rawTopic, topicItem }) => {
    const timeCategory = topicItem?.time?.replace(/\n/g, "").split("\t");
    let time = ''
    
    try {
      const timePart = timeCategory?.[timeCategory.length - 1]
        .replace(/\//g, '')
        .trim()
      time = timePart ? dateParser(timePart) : "";
      time = time ? new Date(time).toString() : "";
    } catch (error) {
      console.log(error)
    }

    const categories = timeCategory ? [timeCategory?.[2].replace(/\//g, '')] : []

    return {
      ...(topicItem ?? rawTopic),
      description: topicItem?.description?.substring(0, 150),
      url: rawTopic.url,
      image: rawTopic.image,
      time,
      categories,
    };
  }

  return await scrapTopics({
    publisher: Publisher.SAMANYOLU,
    locale: Locale.TR,
    url,
    rawTopicsSelectors,
    topicSelectors,
    formatTopic
  });
}

const dateParser = (date: string) => {
  const d = date.split(' ')
  return `${d[2]}-${getMonth(d[1])}-${d[0]}T${d[3]}`
}

export default getSamanyoluNews;