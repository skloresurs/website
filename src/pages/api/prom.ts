import axios from 'src/utils/axios-cache';

const PROM_API_KEY = import.meta.env.PROM_API_KEY;

export async function GET(): Promise<Response> {
  try {
    if (!PROM_API_KEY) {
      return new Response(
        JSON.stringify({
          products: [],
          error: 'Api key error',
        })
      );
    }

    const { data } = await axios.get('https://my.prom.ua/api/v1/products/list?limit=1000', {
      headers: {
        Authorization: `Bearer ${PROM_API_KEY}`,
      },
    });

    return new Response(
      JSON.stringify({
        products: data.products.map((e: any) => {
          return {
            id: e.id,
            title: e.name,
            image: e.main_image,
          };
        }),
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        products: [],
        error: 'Unknown error',
      })
    );
  }
}
