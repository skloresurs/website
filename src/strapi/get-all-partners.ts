import type iPartner from 'src/interfaces/Partner';
import axios from 'src/utils/axios-cms';

export default async function getAllPartners(): Promise<iPartner[] | null> {
  try {
    const { data } = await axios.get('/api/partner', {
      params: {
        'populate[0]': 'logos',
        'populate[logos][populate][0]': 'logo',
      },
    });
    return data.data.attributes.logos.map((e: any) => {
      return {
        id: e.id,
        title: e.title,
        url: import.meta.env.CMS_URL + e.logo.data.attributes.url,
        width: e.logo.data.attributes.width,
        height: e.logo.data.attributes.height,
      };
    });
  } catch (error) {
    return null;
  }
}
