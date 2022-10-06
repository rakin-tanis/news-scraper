import { AxiosRequestHeaders } from 'axios'

export enum Publisher {
  AKTIF_HABER = "Aktif Haber",
  NOS = "Nos",
  NRC = "Nrc",
  AMNESTY = "Amnesty",
  BOLD_MEDYA = "Bold Medya",
  KATTENKENING = "Kanttekening",
  NU = "Nu",
  RTL = "Rtl",
  SAMANYOLU = "Samanyolu",
  TR724 = "Tr724",
  TROUW = "Trouw",
  VOLKSKRANT = "Volkskrant",
}

export enum Locale {
  TR = "tr",
  EN = "en",
  NL = "nl",
}

export type Topic = {
  url: string;
  title?: string;
  description?: string;
  categories?: string[];
  image?: string;
  time?: string;
  locale: Locale;
  publisher: Publisher;
};

export type Selectors = {
  wrapper: string
  link?: string
  title?: string
  image?: string
  description?: string
  categories?: string
  imageAttr?: string
  time?: string
}

export type FormatTopic = (args: { rawTopic: Topic; topicItem?: Topic }) => Topic;

export type ScrapPageArgs = {
  publisher: Publisher
  locale: Locale
  selectors: Selectors
  url: URL
  proxy?: string
  headers?: AxiosRequestHeaders
}

export type ScrapTopicsArgs = {
  rawTopicsSelectors: Selectors;
  topicSelectors?: Selectors;
  formatTopic: FormatTopic;
} & Pick<ScrapPageArgs, "publisher" | "locale" | "url" | "proxy" | "headers">;

export type ScrapPage = (args: ScrapPageArgs) => Promise<Topic[]>

export type ScrapTopics = (args: ScrapTopicsArgs) => Promise<Topic[]>;




