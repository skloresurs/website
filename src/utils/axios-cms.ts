import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const axios = setupCache(
  Axios.create({
    baseURL: import.meta.env.CMS_URL,
    headers: {
      Authorization: `Bearer ${import.meta.env.CMS_API_KEY}`,
    },
  })
);

export default axios;
