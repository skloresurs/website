import type iVacancy from 'src/interfaces/Vacancy';
import axios from 'src/utils/axios-cms';

export default async function getAllVacancies(locale: string): Promise<iVacancy[] | null> {
  try {
    const { data } = await axios.get('/api/vacancies', {
      params: {
        locale,
        'populate[0]': 'image',
        'populate[1]': 'video',
      },
    });
    return data.data.map((e: any) => {
      return {
        id: e.id,
        title: e.attributes.title,
        description: e.attributes.description,
        content: e.attributes.content,
        image: {
          url: import.meta.env.CMS_URL + e.attributes.image.data.attributes.url,
          width: e.attributes.image.data.attributes.width,
          height: e.attributes.image.data.attributes.height,
        },
        video: e.attributes.video.data
          ? import.meta.env.CMS_URL + e.attributes.video.data.attributes.url
          : null,
      };
    });
  } catch (error) {
    return null;
  }
}
