import type iPost from 'src/interfaces/Post';
import axios from 'src/utils/axios-cms';

export default async function getAllPosts(locale: string): Promise<iPost[] | null> {
  try {
    const { data } = await axios.get('/api/posts', {
      params: {
        locale,
        'sort[0]': 'createdAt:desc',
        'populate[0]': 'image',
      },
    });
    return data.data.map((e: any) => {
      return {
        id: e.id,
        title: e.attributes.title,
        description: e.attributes.description,
        category: e.attributes.category,
        image: {
          url: import.meta.env.CMS_URL + e.attributes.image.data.attributes.url,
          width: e.attributes.image.data.attributes.width,
          height: e.attributes.image.data.attributes.height,
        },
        content: e.attributes.content,
        video: e.attributes.video,
      };
    });
  } catch (error) {
    return null;
  }
}
