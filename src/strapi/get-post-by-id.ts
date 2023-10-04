import type iPost from 'src/interfaces/Post';
import axios from 'src/utils/axios-cms';

export default async function getPostById(locale: string, id: number): Promise<iPost | null> {
  try {
    const { data } = await axios.get(`/api/posts/${id}`, {
      params: {
        'populate[0]': 'image',
      },
    });
    if (data.data.attributes.locale !== locale) {
      return null;
    }
    return {
      id: data.data.id,
      title: data.data.attributes.title,
      category: data.data.attributes.category,
      video: data.data.attributes.video,
      description: data.data.attributes.description,
      content: data.data.attributes.content,
      image: {
        url: import.meta.env.CMS_URL + data.data.attributes.image.data.attributes.url,
        width: data.data.attributes.image.data.attributes.width,
        height: data.data.attributes.image.data.attributes.height,
      },
    };
  } catch (error) {
    return null;
  }
}
