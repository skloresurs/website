import React, { useState } from 'react';

interface iProps {
  title: string;
  location: string;
  type: string;
  year: string;
  images: ReadonlyArray<string | null>;
  localeString: {
    location: string;
    glass: string;
    year: string;
  };
}

export default function ProjectFullScreen({
  title,
  location,
  type,
  year,
  images,
  localeString,
}: iProps): JSX.Element {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className='fixed inset-0 -z-10'>
        {images.map(
          (image, index) =>
            image && (
              <img
                className={`fixed inset-0 h-screen w-screen translate-x-0 object-cover duration-1000 ease-in-out ${
                  active === index ? 'opacity-100' : 'opacity-0'
                }`}
                src={image}
                key={index}
                alt={title}
                width="1920"
                height="1080"
              />
            )
        )}
      </div>
      <div className='absolute inset-x-0 top-32'>
        <h1 className='pt-8 text-center text-2xl text-white drop-shadow-[0_1.6px_1.6px_rgba(,0,0,0.8)] md:text-3xl xl:text-4xl'>
          {title}
        </h1>
      </div>
      <div className='fixed inset-x-0 bottom-8'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-2 md:flex-row'>
          <div className='flex flex-row items-center gap-2 rounded-full bg-slate-100 px-3  py-1'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path
                fill='#000000'
                d='M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z'
              />
            </svg>
            <p>
              {localeString.location}: {location}
            </p>
          </div>
          <div className='flex flex-row items-center gap-2 rounded-full bg-slate-100 px-3 py-1'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 32 32'>
              <path
                fill='#000000'
                d='M10.828 28h10.344a3.43 3.43 0 0 0 3.43-3.43V10.33h-3.43v14.24H7.398a3.43 3.43 0 0 0 3.43 3.43Z'
              />
              <path
                fill='#000000'
                d='M21.172 4H10.828a3.43 3.43 0 0 0-3.43 3.43v14.24h3.43V7.43h13.774A3.43 3.43 0 0 0 21.172 4Z'
              />
            </svg>
            <p>
              {localeString.glass}: {type}
            </p>
          </div>
          <div className='flex flex-row items-center gap-2 rounded-full bg-slate-100 px-3  py-1'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path
                fill='#000000'
                d='M15 13h1.5v2.82l2.44 1.41l-.75 1.3L15 16.69V13m4-5H5v11h4.67c-.43-.91-.67-1.93-.67-3a7 7 0 0 1 7-7c1.07 0 2.09.24 3 .67V8M5 21a2 2 0 0 1-2-2V5c0-1.11.89-2 2-2h1V1h2v2h8V1h2v2h1a2 2 0 0 1 2 2v6.1c1.24 1.26 2 2.99 2 4.9a7 7 0 0 1-7 7c-1.91 0-3.64-.76-4.9-2H5m11-9.85A4.85 4.85 0 0 0 11.15 16c0 2.68 2.17 4.85 4.85 4.85A4.85 4.85 0 0 0 20.85 16c0-2.68-2.17-4.85-4.85-4.85Z'
              />
            </svg>
            <p>
              {localeString.year}: {year}
            </p>
          </div>
        </div>
      </div>
      <button
      aria-label='Preview'
        className='group absolute bottom-0 left-0 top-32 z-30 w-40 disabled:hidden sm:w-60 md:w-72'
        onClick={() => {
          setActive(Math.max(active - 1, 0));
        }}
        disabled={active <= 0}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='112'
          height='112'
          viewBox='0 0 24 24'
          className='mx-auto h-16 duration-1000 group-hover:h-28'
        >
          <path fill='#ffffff' d='M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.42Z' />
        </svg>
      </button>
      <button
      aria-label='Next'
        className='group absolute bottom-0 right-0 top-32 z-30 w-40 disabled:hidden sm:w-60 md:w-72'
        onClick={() => {
          setActive(Math.min(active + 1, images.length - 1));
        }}
        disabled={active >= images.length - 1}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='112'
          height='112'
          viewBox='0 0 24 24'
          className='mx-auto h-16 duration-1000 group-hover:h-28'
        >
          <path fill='#ffffff' d='M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42Z' />
        </svg>
      </button>
    </>
  );
}
