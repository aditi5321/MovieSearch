'use client'
import React, { use, useEffect, useState } from 'react'
import Loading from './Loading'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const HomePage = () => {

  interface IMovie{
    poster_path: string;
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
    videos: { results: [{type: string; key: string}]}
  };

  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [movie, setMovie] = useState<IMovie>();

  useEffect(()=>{
    setIsLoading(true)
    setIsImageLoading(true)

    let searchMovie = searchParams.get("movie")

    if (searchMovie === null){
      searchMovie = "avengers";
    }

    axios.get('https://api.themoviedb.org/3/search/movie', {
      params:{
        api_key: process.env.NEXT_PUBLIC_API_KEY,
        query: searchMovie

      }
    }).then((res)=>{
      axios.get(
        `https://api.themoviedb.org/3/movie/${res?.data?.results[0]?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`
      )
      .then((res)=>{
        setMovie(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
    })
  }, [])
  return (
    <div className='bg-gray-100 relative  px-4'>
      {isLoading && <Loading/>}
      
      <div className='container mx-auto min-h-[calc(100vh-77px)] flex items-center relative'>
        <div className="flex-col lg:flex-row flex gap-10 lg-mx-10 py-20">
          <div className="mx-auto flex-none relative">
            <Image src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            width={700}
            height={700}
            className='w-[300px] object-cover'
            alt='movie poster'
            onLoadingComplete={()=> setIsImageLoading(false)}
            priority
            />
            {isImageLoading && <Loading/>}
          </div>
          <div className="space-y-6">
            <div className="uppercase -translate-y-3 text-[26px] md:text-[34px] font-medium pr-4">{movie?.title}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage