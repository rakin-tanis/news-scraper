import { Strapi } from "../mock/strapi";
import getAktifHaber from "./topics/sources/aktifHaber";
import getAmnesty from "./topics/sources/amnesty";
import getBoldMedya from "./topics/sources/boldMedya";
import kanttekening from './topics/sources/kanttekening'
import nos from './topics/sources/nos'
import nrc from './topics/sources/nrc'
import nu from './topics/sources/nu'
import rtl from './topics/sources/rtl'
import samanyolu from './topics/sources/samanyoluHaber'
import tr724 from './topics/sources/tr724'
import trouw from './topics/sources/trouw'
import volkskrant from './topics/sources/volkskrant'

export default async ({ strapi }: { strapi: Strapi }) => {
  try {
    const sources = [
      getAktifHaber,
      getAmnesty,
      getBoldMedya,
      kanttekening,
      nos,
      nrc,
      nu,
      rtl,
      samanyolu,
      tr724,
      trouw,
      volkskrant,
    ];

    console.log("-----------------------------------");
    console.log("All news fetching... " + new Date());

    const results = await Promise.all(sources.map((source) => source()));
    console.log("All news fetched. " + new Date());
    console.log("-----------------------------------");

    return await strapi
      .service("api::topic.topic")
      .createOrUpdate({ data: { data: results.flat() } });
  } catch (error) {
    console.error("error", error);
    return error;
  }
};

/* 
+ 1- Bold Medya
+ https://boldmedya.com/
+ 2- Samanyoluhaber
+ http://www.samanyoluhaber.com/
+ 3- Aktifhaber
+ http://aktifhaber.com/
+ 4- tr724
+ https://www.tr724.com/
+ 1-NOS
+ https://nl.m.wikipedia.org/wiki/Lijst_van_kranten_in_Nederland
+ 2- De Kanttekening
+ https://dekanttekening.nl/
+ 3- Nu
+ https://www.nu.nl/
+ 4- Amnesty.nl
+ https://www.amnesty.nl/
? 5- De Telegraaf
? https://www.telegraaf.nl/
? 6- Ad
? https://www.ad.nl/
+ 7- De Volkskrant
+ https://www.volkskrant.nl/
+ 8- NRC
+ https://www.nrc.nl/
+ 9- Trouw
+ https://www.trouw.nl/
+ 10- Fd
+ https://fd.nl/ 

*/
