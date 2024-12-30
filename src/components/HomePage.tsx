"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

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
  videos: { results: [{ type: string; key: string }] };
}
const HomePage = () => {
  const searchParams = useSearchParams();

  const [state, setState] = useState({
    isLoading: true,
    isImageLoading: true,
    movies: [] as IMovie[],
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      isImageLoading: true,
    }));

    const searchMovie = searchParams.get("movie");

    if (searchMovie) {
      FetchMovies(searchMovie, state.currentPage);
    } else {
      FetchMovies(null, state.currentPage);
    }
  }, [searchParams, state.currentPage]);

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

  const handlePageClick = (page: number) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

  const handleNextPage = () => {
    if (state.currentPage < state.totalPages) {
      setState((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (state.currentPage > 1) {
      setState((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  const generatePageNumber = () => {
    const pageNumbers = [];
    let startPage = Math.max(state.currentPage - 2, 1);
    let endPage = Math.min(state.currentPage + 2, state.totalPages);

    if (state.totalPages > 5) {
      if (state.currentPage <= 3) {
        endPage = 5;
      } else if (state.currentPage >= state.totalPages - 2) {
        startPage = state.totalPages - 4;
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return state.isLoading ? (
    <Loading />
  ) : (
    <div className="bg-gray-100 relative px-4">
      <div className="container mx-auto min-h-[calc(100vh-77px)] relative">
        <div className="flex flex-wrap gap-15 lg:mx-10 py-20">
          {state.movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/5 "
            >
              <Link href={`/SingleMovies?id=${movie.id}`}>
                <div className="h-auto relative flex flex-col items-center group  pb-10">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    width={1000}
                    height={1000}
                    className="w-[200px] object-cover hover:scale-110 hover:backdrop-blur-md transition-all ease-linear duration-200 rounded-lg "
                    alt="movie poster"
                    onLoadingComplete={() =>
                      setState((prevState) => ({
                        ...prevState,
                        isImageLoading: false,
                      }))
                    }
                    priority
                  />
                  <p className="fixed overflow-hidden flex items-center justify-center text-center text-white font-medium text opacity-0 group-hover:opacity-100 group-hover:bg-red-500 group-hover:bg-opacity-50 transition-all duration-300 ease-in-out p-2">
                    {movie?.title}
                  </p>
                  {/* <div className="absolute inset-0 flex items-center justify-center text-center text-white font-medium text-[20px] opacity-0 group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-50 transition-all duration-300 ease-in-out p-2">
                    {movie?.title}
                  </div> */}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-center py-4">
          <button
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            onClick={handlePrevPage}
            disabled={state.currentPage === 1}
          >
            Prev
          </button>

          {generatePageNumber().map((pageNumber) => (
            <button
              className={`px-4 py-2 mx-2 bg-blue-500 text-white rounded-md disable:bg-gray-300 ${
                state.currentPage === pageNumber ? "bg-blue-700" : "bg-blue-500"
              }`}
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          <button
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md disable:bg-gray-300"
            onClick={handleNextPage}
            disabled={state.currentPage === state.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
