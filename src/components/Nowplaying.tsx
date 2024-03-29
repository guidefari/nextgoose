import useSWR from 'swr'
import { useEffect } from 'react'
import { animate } from 'motion'

import fetcher from 'src/lib/fetcher'
import { NowPlayingSong } from '@/src/types'
import Image from 'next/image'
import CustomLink from './CustomLink'

function AnimatedBars() {
  useEffect(() => {
    animate(
      '#bar1',
      {
        transform: [
          'scaleY(1.0) translateY(0rem)',
          'scaleY(1.5) translateY(-0.082rem)',
          'scaleY(1.0) translateY(0rem)',
        ],
      },
      {
        duration: 1.0,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
    animate(
      '#bar2',
      {
        transform: [
          'scaleY(1.0) translateY(0rem)',
          'scaleY(3) translateY(-0.083rem)',
          'scaleY(1.0) translateY(0rem)',
        ],
      },
      {
        delay: 0.2,
        duration: 1.5,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
    animate(
      '#bar3',
      {
        transform: [
          'scaleY(1.0)  translateY(0rem)',
          'scaleY(0.5) translateY(0.37rem)',
          'scaleY(1.0)  translateY(0rem)',
        ],
      },
      {
        delay: 0.3,
        duration: 1.5,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
  }, [])

  return (
    <div className="flex items-end w-auto overflow-hidden animate-bounce">
      <span id="bar1" className="mr-[3px] h-2 w-1 bg-highlight opacity-75 " />
      <span id="bar2" className="mr-[3px] h-1 w-1 bg-highlight " />
      <span id="bar3" className="w-1 h-3 bg-highlight opacity-80 " />
    </div>
  )
}

export default function Nowplaying() {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher)

  if (!data?.albumImageUrl) return

  return (
    <div className="flex flex-row items-center w-full max-w-md p-2 mx-auto my-4 space-x-2 rounded-lg ">
      {data?.albumImageUrl ? (
        <a
          className="transition duration-300 ease-in-out lg:hover:scale-103"
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="rounded-lg"
            width={89}
            height={89}
            alt={data.title}
            src={data.albumImageUrl || ''}
          />
        </a>
      ) : null}
      {data?.songUrl ? (
        <AnimatedBars />
      ) : (
        <svg className="ml-auto mt-[-2px] h-4 w-4" viewBox="0 0 168 168">
          <path
            fill="#1ED760"
            d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
          />
        </svg>
      )}
      <div className="flex-col w-full max-w-full truncate sm:flex-row">
        {data?.songUrl ? (
          <CustomLink
            className="font-extrabold text-green-500 truncate capsize max-w-max"
            href={data.songUrl}
            as={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="inline-block w-6 h-6 mr-2 fill-current hover:underline"
            >
              <path d="M16 0c-8.803 0-16 7.197-16 16s7.197 16 16 16c8.803 0 16-7.197 16-16s-7.12-16-16-16zM23.36 23.12c-0.319 0.479-0.881 0.64-1.36 0.317-3.76-2.317-8.479-2.797-14.083-1.52-0.557 0.165-1.037-0.235-1.199-0.72-0.156-0.557 0.24-1.036 0.719-1.197 6.084-1.36 11.365-0.803 15.521 1.76 0.563 0.24 0.64 0.88 0.401 1.36zM25.281 18.719c-0.401 0.563-1.12 0.803-1.683 0.401-4.317-2.641-10.88-3.437-15.916-1.839-0.641 0.156-1.365-0.161-1.521-0.803-0.161-0.64 0.156-1.359 0.797-1.52 5.844-1.761 13.041-0.876 18 2.161 0.484 0.24 0.724 1.041 0.323 1.599zM25.443 14.24c-5.125-3.043-13.683-3.36-18.563-1.839-0.801 0.239-1.599-0.24-1.839-0.964-0.239-0.797 0.24-1.599 0.959-1.839 5.683-1.681 15.041-1.359 20.964 2.161 0.719 0.401 0.957 1.36 0.557 2.079-0.401 0.563-1.36 0.801-2.079 0.401z" />
            </svg>
            {data.title}
          </CustomLink>
        ) : (
          <p className="font-medium capsize ">Not Playing</p>
        )}
        <p className="truncate capsize max-w-max ">{data?.artist ?? 'Spotify'}</p>
      </div>
    </div>
  )
}
