import type iReporting from 'src/interfaces/Reporting';
import axios from 'src/utils/axios-cms';

export default async function getAllReportings(): Promise<iReporting[] | null> {
  try {
    const { data } = await axios.get('/api/reportings', {
      params: {
        'populate[0]': 'auditory',
        'populate[1]': 'finance',
      },
    });
    return data.data.map((e: any) => {
      return {
        year: e.attributes.year,
        finance: import.meta.env.CMS_URL + e.attributes.finance.data.attributes.url,
        auditory: import.meta.env.CMS_URL + e.attributes.auditory.data.attributes.url,
      };
    });
  } catch (error) {
    return null;
  }
}
