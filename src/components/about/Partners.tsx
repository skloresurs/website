import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type iPartner from 'src/interfaces/Partner';

interface iProps {
  title: string;
  partners: iPartner[];
}

export default function Partners({ title, partners }: iProps): JSX.Element {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  ]);

  return (
    <div className='my-16 px-6 md:px-10 lg:px-12'>
      <div className='mb-5 flex justify-center' data-aos='fade-up' data-aos-duration='400'>
        <h2 className='border-b-2 border-blue-600 px-2 pb-2 text-center text-3xl font-bold text-blue-600'>
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
              <div
                key={e.id}
                title={e.title}
                className='mx-5 flex-[0_0_50%] object-cover md:flex-[0_0_33%] lg:flex-[0_0_25%] xl:flex-[0_0_20%]'
              >
                <img
                  src={e.url}
                  title={e.title}
                  alt={e.title}
                  width={e.width}
                  height={e.height}
                  className='m-auto'
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
