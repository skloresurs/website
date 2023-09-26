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
    <div className='flex flex-col items-center gap-2 md:flex-row md:gap-5'>
      <div className='flex flex-1 flex-col gap-2 overflow-hidden rounded-md bg-white pb-3'>
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            playing
            muted
            loop
            volume={0}
            controls={false}
            url={data[currentVideo].video}
            width='100%'
            height='100%'
          />
        </div>
        <Title content={data[currentVideo].title} />
        <Description content={data[currentVideo].description} />
      </div>
      <div className='flex min-w-[250px] max-w-min flex-col gap-2'>
        <div className='flex justify-center bg-white rounded-md'>
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
              className={`rounded-md border-2 px-2 py-3 duration-300 hover:bg-gray-300 ${
                i === currentVideo ? 'bg-gray-300' : 'bg-white'
              }`}
            >
              {e.title}
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
