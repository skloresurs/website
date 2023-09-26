import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface iProps {
  title: string;
  partners: Array<{
    _id: string;
    logo: {
      url: string;
    };
    title: string;
    url: string;
  }>;
}

export default function Partners({ title, partners }: iProps): JSX.Element {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  ]);

  return (
    <div className='mb-5 mt-10 px-6 md:px-10 lg:px-12'>
      <div className='flex justify-center' data-aos='fade-up' data-aos-duration='400'>
        <h2 className='mb-5 mt-10 border-b-2 border-blue-600 px-2 pb-2 text-center text-3xl font-bold text-blue-600'>
          {title}
        </h2>
      </div>
      <div className='overflow-hidden' ref={emblaRef} data-aos='fade-up' data-aos-duration='400'>
        <div className='flex flex-row items-center'>
          {partners
            .sort((a, b) => {
              const aTitle = a.title.toLowerCase();
              const bTitle = b.title.toLowerCase();

              return aTitle < bTitle ? -1 : 1;
            })
            .map((e) => (
              <a
                key={e._id}
                href={e.url}
                title={e.title}
                className='flex-[0_0_50%] cursor-pointer object-cover md:flex-[0_0_33%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] mx-5'
                target='_blank'
              >
                <img src={e.logo.url} title={e.title} alt={e.title} className='m-auto' />
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
