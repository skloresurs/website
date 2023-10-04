import type iService from 'src/interfaces/Service';
import axios from 'src/utils/axios-cms';

export default async function getAllServices(
  locale: string,
  category: string
): Promise<iService[] | null> {
  try {
    const { data } = await axios.get('/api/services', {
      params: {
        locale,
        'filters[category][$eq]': category,
        'populate[0]': 'image',
        'sort[0]': 'title',
      },
    });
    return data.data.map((e: any) => {
      return {
        title: e.attributes.title,
        description: e.attributes.description,
        image: {
          url: import.meta.env.CMS_URL + e.attributes.image.data.attributes.url,
          width: e.attributes.image.data.attributes.width,
          height: e.attributes.image.data.attributes.height,
        },
      };
    });
  } catch (error) {
    return null;
  }
}
