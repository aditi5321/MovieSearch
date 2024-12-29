"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IMovie } from "./HomePage"; // Import IMovie from HomePage
import { IoMdClose } from "react-icons/io";
import { BsPlayFill } from "react-icons/bs";
import Loading from "./Loading";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Genres from "./Genres";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const SingleMovie = () => {
  const params = useSearchParams();
  const id = params.get("id"); // Extract movie ID from the URL query

  const [state, setState] = useState({
    isLoading: false,
    isImageLoading: false,
    movie: null as IMovie | null,
    trailer: "",
    showPlayer: false,
  });

  // Fetch movie details based on the movie ID in the URL
  useEffect(() => {
    if (!id) return; // Avoid making request if ID is not available yet

    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      isImageLoading: true,
    }));

    // Fetch movie details using the movie ID
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          append_to_response: "videos", // Include video data (trailers)
        },
      })
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          movie: res.data,
          isLoading: false,
        }));
      })
  }, [id]); // Dependency on 'id' to trigger the effect when the ID changes

  useEffect(() => {
    const trailerIndex = state.movie?.videos?.results?.findIndex(
      (element) => element.type === "Trailer"
    );
    const trailerURL = `https://www.youtube.com/watch?v=${
      state.movie?.videos?.results[trailerIndex || 0]?.key
    }`;
    setState((prevState) => ({
      ...prevState,
      trailer: trailerURL,
    }));
  }, [state.movie]);

  return (
    <div className="bg-gray-100 relative px-4">
      {state.isLoading && <Loading />}
      {/* Show loading component until the movie data is loaded */}
      {state.movie && (
        <div className="container mx-auto min-h-[calc(100vh-77px)] flex items-center relative">
          <div className="flex-col lg:flex-row flex gap-10 lg-mx-10 py-20">
            <div className="mx-auto flex-none relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${state.movie.poster_path}`}
                width={700}
                height={700}
                className="w-[300px] object-cover"
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
            {state.isImageLoading && <Loading />}
            <div className="space-y-6">
              <div className="uppercase -translate-y-3 text-[26px] md:text-[34px] font-medium pr-4">
                {state.movie?.title}
              </div>
              <div className="flex gap-4 flex-wrap">
                {state.movie?.genres?.map((genre, index) => (
                    <Genres
                    key={genre?.id}
                    index={index}
                    length={state.movie?.genres?.length}
                    name={genre?.name}

                    />
                ))}
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                <div>
                  Language: {state.movie?.original_language?.toUpperCase()}
                </div>
                <div>Release: {state.movie?.release_date}</div>
                <div>Runtime: {state.movie?.runtime} MIN.</div>
                <div>Rating: {state.movie?.vote_average}</div>
              </div>
              <div className="pt-14 space-y-2 pr-4">
                <div>OVERVIEW:</div>
                <div className="lg:line-clamp-4">{state.movie?.overview}</div>
              </div>
              <div
                className="inline-block pt-6 cursor-pointer"
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    showPlayer: true,
                  }))
                }
              >
                <div className="flex gap-2 items-center px-4 py-2 mb-6 bg-blue-100 hover:bg-blue-400 rounded">
                  <BsPlayFill size={24} />
                  Watch Trailer
                </div>
              </div>
            </div>
          </div>

          {/* React Player */}
          <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[21%] rounded transition duration-1000 ${
              state.showPlayer ? "opacity-100 z-50" : "opacity-0 -z-10"
            }`}
          >
            <div className="flex items-center justify-between bg-black text-white w-[100vh] p-3.5">
              <span className="font-semibold">Playing Trailer</span>
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    showPlayer: false,
                  }))
                }
              >
                <IoMdClose className="h-5" />
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                url={state.trailer}
                width="100vh"
                height="75vh"
                style={{ position: "absolute", top: "0", left: "0" }}
                controls={true}
                playing={state.showPlayer}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleMovie;
