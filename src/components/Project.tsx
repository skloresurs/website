import React, { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

interface iProps {
  title: string;
  data: Array<{
    url: string;
    width: number;
    height: number;
  }>;
}

export default function Project({ title, data }: iProps): JSX.Element {
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      wheelToZoom: true,
      pswpModule: async () => await import('photoswipe'),
    });
    lightbox.init();

    return () => {
      lightbox?.destroy();
      lightbox = null;
    };
  }, []);

  return (
    <div className='pswp-gallery col-span-2 flex flex-row md:col-span-6' id='gallery'>
      {data.map((e: { url: string; width: number; height: number }, i: number) => (
        <a
          href={e.url}
          className='group mx-auto cursor-pointer overflow-hidden'
          title={title}
          data-pswp-width={e.width}
          data-pswp-height={e.height}
          id={`img-${i}`}
        >
          <img
            src={e.url}
            alt={title}
            title={title}
            loading='lazy'
            className='border-2 border-[#05151d] object-cover opacity-70 duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:opacity-100'
          />
        </a>
      ))}
    </div>
  );
}
