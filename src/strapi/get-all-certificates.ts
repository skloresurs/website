import type iCertificate from 'src/interfaces/Certificate';
import axios from 'src/utils/axios-cms';

export default async function getAllCertificates(): Promise<iCertificate[] | null> {
  try {
    const { data } = await axios.get('/api/certificate', {
      params: {
        'populate[0]': 'certificates',
      },
    });
    return data.data.attributes.certificates.data.map((e: any) => {
      return {
        url: import.meta.env.CMS_URL + e.attributes.url,
        width: e.attributes.width,
        height: e.attributes.height,
      };
    });
  } catch (error) {
    return null;
  }
}
