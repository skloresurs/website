import type iProduction from 'src/interfaces/Production';
import axios from 'src/utils/axios-cms';

export default async function getAllProductions(locale: string): Promise<iProduction[] | null> {
  try {
    const { data } = await axios.get('/api/productions', {
      params: {
        locale,
        'populate[0]': 'video',
      },
    });
    return data.data.map((e: any) => {
      return {
        title: e.attributes.title,
        description: e.attributes.description,
        order: e.attributes.order,
        video: import.meta.env.CMS_URL + e.attributes.video.data.attributes.url,
      };
    });
  } catch (error) {
    return null;
  }
}
