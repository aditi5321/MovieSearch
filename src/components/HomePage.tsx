'use client'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export interface IMovie {
  poster_path: string;
  id: number;
  title: string;
  genres: [
    {
      name: string;
      id: string;
    }
  ];
  original_language: string;
  release_date: string;
  runtime: string;
  vote_average: string;
  overview: string;
  videos: { results: [{ type: string; key: string }] }
};
const HomePage = () => {



  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    setIsLoading(true)
    setIsImageLoading(true)

    let searchMovie = searchParams.get("movie")

    if (searchMovie === null) {
      searchMovie = "movies";
    }

    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY,
        query: searchMovie

      }
    })
      .then((res) => {
        const FetchMovies = res?.data?.results || []
        setMovies(FetchMovies)
        setIsLoading(false)
      })
  }, [searchParams])

  return (
    <div className='bg-gray-100 relative  px-4'>
      {isLoading && <Loading />}

      <div className='container mx-auto min-h-[calc(100vh-77px)] flex items-center relative'>
        <div className="flex flex-wrap gap-10 lg:mx-10 py-20">
          {movies.map((movie) => (
            <div key={movie.id} className='flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/5 '>
              <Link href={`/SingleMovies?id=${movie.id}`}>
                <div className=" relative flex flex-col items-center">
                  <Image src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    width={1000}
                    height={1000}
                    className='w-[200px] object-cover'
                    alt='movie poster'
                    onLoadingComplete={() => setIsImageLoading(false)}
                    priority
                  />
                  {isImageLoading && <Loading />}
                  <div className="uppercase -translate-y-3 text-[26px] md:text-[20px] font-medium pt-5 text-center">{movie?.title}</div>
                </div>
              </Link>

            </div>


          ))}


        </div>
      </div>
    </div >
  )
}

export default HomePage