import { useState } from 'react';

interface iProduct {
  id: string;
  title: string;
  image?: string;
}

interface iProps {
  data: iProduct[];
  translationData: {
    previewPage: string;
    nextPage: string;
    details: string;
  };
}

export default function Productlist({ data, translationData }: iProps): JSX.Element {
  const pages = Math.ceil(data.length / 12);

  const [page, setPage] = useState<number>(0);
  const pageData = data.slice(page * 12, page * 12 + 12);

  function previewPage(): void {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  function nextPage(): void {
    if (page + 1 < pages) {
      setPage(page + 1);
    }
  }
  return (
    <>
      <div className='grid grid-cols-1 gap-3 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {pageData.map((e, i) => (
          <Product
            key={e.id}
            data={{
              id: e.id,
              title: e.title,
              image: e.image,
            }}
            detailTransaltionText={translationData.details}
          />
        ))}
      </div>
      <div className='flex flex-row items-center justify-between'>
        <button
          id='previewpage'
          onClick={previewPage}
          disabled={page <= 0}
          title={translationData.previewPage}
          className={`cursor-pointer rounded-md bg-blue-600 px-4 py-3 text-center text-white duration-300 hover:scale-105 disabled:cursor-default ${
            page <= 0 ? 'opacity-0' : ''
          }`}
        >
          ←
        </button>
        <span>
          {page + 1}/{pages}
        </span>
        <button
          id='nextpage'
          onClick={nextPage}
          disabled={page + 1 >= pages}
          title={translationData.nextPage}
          className={`cursor-pointer rounded-md bg-blue-600 px-4 py-3 text-center text-white duration-300 hover:scale-105 disabled:cursor-default ${
            page + 1 >= pages ? 'opacity-0' : ''
          }`}
        >
          →
        </button>
      </div>
    </>
  );
}

function Product({
  data,
  detailTransaltionText,
}: {
  data: iProduct;
  detailTransaltionText: string;
}): JSX.Element {
  return (
    <div
      className='flex flex-col items-center gap-3 rounded-md border-2 border-neutral-100 p-3'
      data-aos='fade-up'
      data-aos-duration='400'
    >
      <img
        src={
          !data.image || data.image.startsWith('/')
            ? 'https://placehold.co/400?text=Missing Image'
            : data.image
        }
        alt={data.title}
        width='200px'
        height='200px'
        className='h-[200px] w-[200px] object-cover object-center'
        onError={({ currentTarget }) => {
          currentTarget.src = 'https://placehold.co/400?text=Missing Image';
        }}
      />
      <h2 className='flex-1 text-center text-xl font-semibold'>{data.title}</h2>
      <a
        target='_blank'
        href={`https://skloresurscompany.prom.ua/ua/site_search?search_term=${data.title.replaceAll(
          ' ',
          '+'
        )}`}
        title={detailTransaltionText}
        className='cursor-pointer rounded-md bg-blue-600 px-4 py-3 text-center text-white duration-300 hover:scale-105'
      >
        {detailTransaltionText}
      </a>
    </div>
  );
}
