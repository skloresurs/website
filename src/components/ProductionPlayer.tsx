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
      <div className='flex h-min min-h-[700px] flex-1 flex-col gap-2 overflow-hidden rounded-md bg-white/75 pb-3'>
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
      <div className='flex min-w-[450px] max-w-min flex-col gap-2'>
        <div className='flex justify-center rounded-md bg-white/75'>
          <h2 className='my-3 border-b-2 border-blue-600 px-2 pb-2 text-center text-3xl font-bold text-blue-600'>
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
              className='flex flex-row gap-2 rounded-md bg-white/75 p-2'
            >
              <img src={`/images/production/${i + 1}.png`} width='150' className='rounded' />
              <div className='flex h-full flex-col items-start justify-between'>
                <p className='text-lg font-medium'>{e.title}</p>
                <p className='text-sm'>{e.description.slice(0, 30).trim()}...</p>
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
  return <h2 className='px-3 text-3xl font-bold'>{currentText}</h2>;
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
  return <p className='px-3'>{currentText}</p>;
}
