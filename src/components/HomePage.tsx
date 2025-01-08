"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Navbar from "./Navbar";
import PaginationSection from "./PaginationSection";

export interface IMovie {
  poster_path: string;
  backdrop_path: string;
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
  videos: { results: [{ type: string; key: string }] };
}
const HomePage = () => {
  const searchParams = useSearchParams();

  const [state, setState] = useState({
    isLoading: true,
    isImageLoading: true,
    movies: [] as IMovie[],
    totalPages: 1,
  });

  const [currentPage, setCurrentPage]= useState(1)


  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      isImageLoading: true,
    }));

    const searchMovie = searchParams.get("movie");

    if (searchMovie) {
      FetchMovies(searchMovie, currentPage);
    } else {
      FetchMovies(null, currentPage);
    }
  }, [searchParams, currentPage]);

  const FetchMovies = (query: string | null, page: number) => {
    const url = query
      ? "https://api.themoviedb.org/3/search/movie"
      : "https://api.themoviedb.org/3/movie/popular";

    axios
      .get(url, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          query,
          page,
        },
      })
      .then((res) => {
        const FetchedMovies = res?.data?.results || [];
        setState((prevState) => ({
          ...prevState,
          movies: FetchedMovies,
          totalPages: res?.data?.total_pages || 1,
          isLoading: false,
        }));
      });
  };


  return state.isLoading ? (
    <Loading />
  ) : (
    <div className="relative">
      <Navbar />
      <div className="container mx-auto min-h-[calc(100vh-77px)] relative">
        <div className="flex flex-wrap gap-15 lg:mx-10 py-20">
          {state.movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/5 "
            >
              <Link href={`/SingleMovies?id=${movie.id}`}>
                <div className="h-auto relative flex flex-col group hover:scale-110 active:scale-90 items-center pb-10 transition-all ease-linear duration-200 hover:backdrop-blur-md">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    width={1000}
                    height={1000}
                    className="w-[200px] object-cover rounded-lg "
                    alt="movie poster"
                    onLoadingComplete={() =>
                      setState((prevState) => ({
                        ...prevState,
                        isImageLoading: false,
                      }))
                    }
                    priority
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-center py-4">
          <PaginationSection 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={state.totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
