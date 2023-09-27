import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

interface iProps {
  title: string;
  data: Array<{
    video: string;
    title: string;
    description: string;
  }>;
}

export default function ProductionPlayer({ data = [], title }: iProps): JSX.Element {
  const [currentVideo, setCurrentVideo] = useState(0);

  return (
    <div className='flex flex-col gap-2 md:flex-row md:gap-5'>
      <div className='flex h-min flex-1 flex-col gap-2 overflow-hidden rounded-md pb-3'>
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            playing
            muted
            loop
            volume={0}
            controls={false}
            url={`/videos/production/${currentVideo + 1}.mp4`}
            width='100%'
            height='100%'
          />
        </div>
        <Title content={data[currentVideo].title} />
        <Description content={data[currentVideo].description} />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-center rounded-md'>
          <h2 className='my-3 border-b-2 border-blue-500 px-2 pb-2 text-center text-3xl font-bold text-blue-500'>
            {title}
          </h2>
        </div>
        {data.length > 0 &&
          data.map((e, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentVideo(i);
              }}
              className={`flex flex-row gap-3 rounded-md border-2 pr-2 text-white duration-300 ${
                i === currentVideo ? 'border-blue-600' : 'border-white'
              }`}
            >
              <img src={`/images/production/${i + 1}.png`} width='150' className='rounded' />
              <div className='flex h-full flex-col items-start justify-between py-2 text-left'>
                <p className='text-lg font-medium'>{e.title}</p>
                <p className='hidden text-sm md:block'>{e.description.slice(0, 30).trim()}...</p>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}

function Title({ content }: { content: string }): JSX.Element {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentText('');
    setCurrentIndex(0);
  }, [content]);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + content[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 30);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [currentIndex]);
  return <h2 className='px-3 text-3xl font-bold text-white'>{currentText}</h2>;
}

function Description({ content }: { content: string }): JSX.Element {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentText('');
    setCurrentIndex(0);
  }, [content]);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + content[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 10);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [currentIndex]);
  return <p className='px-3 text-white'>{currentText}</p>;
}
