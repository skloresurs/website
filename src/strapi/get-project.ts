import axios from 'src/utils/axios-cms';
import type iProject from 'src/interfaces/Projects';

export default async function getProject(
  locale: string,
  page: number
): Promise<{ page: number; pageCount: number; project: iProject } | null> {
  try {
    const { data } = await axios.get('/api/projects', {
      params: {
        locale,
        'sort[0]': 'year:desc',
        'sort[1]': 'title',
        'populate[0]': 'location',
        'populate[2]': 'images',
        'pagination[pageSize]': 1,
        'pagination[page]': page,
      },
    });
    if (!data.data[0]) return null;
    return {
      page,
      pageCount: data.meta.pagination.pageCount,
      project: {
        title: data.data[0].attributes.title,
        location: data.data[0].attributes.location.data?.attributes.title,
        glass: data.data[0].attributes.glass,
        year: data.data[0].attributes.year,
        images: data.data[0].attributes.images.data.map((e: any) => {
          return {
            url: import.meta.env.CMS_URL + e.attributes.url,
            width: e.attributes.width,
            height: e.attributes.height,
          };
        }),
      },
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
