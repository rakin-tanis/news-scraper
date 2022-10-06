export type StrapiService = {
  createOrUpdate: (data: unknown) => Promise<void>
}

export type Strapi = {
  service: (serviceName: string) => StrapiService;
};

export const strapi: Strapi = {
  service: (serviceName) =>
    <StrapiService>{
      createOrUpdate: async (data: unknown) => {
        console.log(serviceName);
        // console.log(JSON.stringify(data));
        return data;
      },
    },
};