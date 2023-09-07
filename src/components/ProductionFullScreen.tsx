import React, { useEffect, useRef, useState } from 'react';

interface iProps {
  prevText: string;
  nextText: string;
  data: Array<{
    video: string;
    title: string;
    description: string;
  }>;
}

export default function ProductionFullScreen({
  data = [],
  prevText,
  nextText,
}: iProps): JSX.Element {
  const [active, setActive] = useState(0);
  const videos = useRef<HTMLVideoElement[]>([]);

  function next(): void {
    if (active < data.length - 1) {
      videos.current[active].pause();
      videos.current[active + 1].currentTime = 0;
      videos.current[active + 1].play().catch((e) => {
        console.error(e);
      });
      setActive(active + 1);
    }
  }
  function prev(): void {
    if (active > 0) {
      videos.current[active].pause();
      videos.current[active - 1].currentTime = 0;
      videos.current[active - 1].play().catch((e) => {
        console.error(e);
      });
      setActive(active - 1);
    }
  }

  useEffect(() => {
    videos.current[active].play().catch((e) => {
      console.error(e);
    });
  }, [videos]);

  return (
    <>
      <div className='fixed inset-0 -z-10'>
        {data.map((video, index) => (
          <video
            muted
            loop
            key={index}
            ref={(e) => {
              if (e !== null) videos.current[index] = e;
            }}
            className={`fixed inset-0 h-screen w-screen object-cover duration-1000 ease-in-out ${
              index === active ? 'opacity-100' : 'opacity-0'
            }`}
            src={video.video}
          />
        ))}
      </div>
      <div className='absolute inset-x-2 bottom-20 z-40 mx-auto max-w-7xl rounded-md bg-slate-50/75 py-2'>
        <h2 className='text-center text-4xl font-bold lg:text-5xl lg:tracking-tight'>
          {data[active]?.title ?? ''}
        </h2>
        <p className='px-4 text-center text-black'>{data[active]?.description ?? ''}</p>
      </div>
      <div className='fixed inset-x-0 bottom-8 z-50'>
        <div className='mx-auto flex max-w-7xl flex-row items-center justify-between gap-3 px-2'>
          <button
          aria-label={prevText}
            disabled={active <= 0}
            onClick={() => {
              prev();
            }}
            className='flex flex-row items-center gap-2 rounded-md bg-slate-100/75 px-3 py-1'
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
              <path fill='currentColor' d='M10.05 16.94v-4h8.92l.03-2.01h-8.95V6.94l-5 5Z' />
            </svg>
            <p className='hidden sm:block'>{prevText}</p>
          </button>
          <div className='flex flex-row items-center gap-2 rounded-md bg-slate-100/75 px-3 py-1'>
            <p>
              {active + 1}/{data.length}
            </p>
          </div>
          <button
          aria-label={nextText}
            onClick={() => {
              next();
            }}
            disabled={active >= data.length - 1}
            className='flex flex-row items-center gap-2 rounded-md bg-slate-100/75 px-3 py-1'
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
              <path fill='currentColor' d='M14 16.94v-4H5.08l-.03-2.01H14V6.94l5 5Z' />
            </svg>
            <p className='hidden sm:block'>{nextText}</p>
          </button>
        </div>
      </div>
    </>
  );
}
