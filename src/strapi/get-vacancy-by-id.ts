import type iVacancy from 'src/interfaces/Vacancy';
import axios from 'src/utils/axios-cms';

export default async function getVacancyById(locale: string, id: number): Promise<iVacancy | null> {
  try {
    const { data } = await axios.get(`/api/vacancies/${id}`, {
      params: {
        locale,
        'populate[0]': 'image',
        'populate[1]': 'video',
      },
    });
    return {
      id: data.data.id,
      title: data.data.attributes.title,
      description: data.data.attributes.description,
      content: data.data.attributes.content,
      image: {
        url: import.meta.env.CMS_URL + data.data.attributes.image.data.attributes.url,
        width: data.data.attributes.image.data.attributes.width,
        height: data.data.attributes.image.data.attributes.height,
      },
      video: data.data.attributes.video.data
        ? import.meta.env.CMS_URL + data.data.attributes.video.data.attributes.url
        : null,
    };
  } catch (error) {
    return null;
  }
}
