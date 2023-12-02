import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMovies, imgUrl } from "./services/movies";
import {
  setHistory,
  setMovie,
  setSimilarMovies,
} from "./store/reducers/movies";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { styled } from "styled-components";
import axios from "axios";
import Chips from "./component/chips";
import Ratings from "./component/ratings";
import Carousel from "./component/carousel";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import VideoPlayer from "./component/videoPlayer";
const API_KEY = "cf368287dabf371a97e4e78fe0dd33ed";

function Details() {
  const { id: movie_id } = useParams();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [loading, setLoading] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const scrollRef = useRef(null);
  console.log(movies.watchHistory);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data: results } = await getMovies(`/movie/${movie_id}`);
        console.log(results);
        setLoading(false);
        dispatch(setMovie(results));
      } catch (error) {
        setLoading(false);
      }
    })();
    (async () => {
      setLoading(true);
      try {
        const {
          data: { results },
        } = await getMovies(`/movie/${movie_id}/similar`);
        console.log(results);
        setLoading(false);
        dispatch(setSimilarMovies(results));
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [movie_id]);
  const getMovieTrailer = async (movie) => {
    try {
      const detailsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`
      );

      const videos = detailsResponse.data.videos.results;
      const trailer = videos.find(
        (video) => video.type === "Trailer" || video.type === "Clip"
      );

      const youtubeUrl = trailer.key;

      return youtubeUrl;
    } catch (error) {
      alert("Error fetching movie information:");
      console.error("Error fetching movie information:", error);
      return null;
    }
  };

  const callMovieTrailer = async (movie) => {
    const url = await getMovieTrailer(movie);

    dispatch(setHistory(movie));
    setTrailerUrl(url);

    if (!trailerUrl) {
      return <div>Loading...</div>;
    }
  };

  const handleSlide = (dir) => {
    const container = scrollRef.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    scrollRef.current.scrollTo({
      left: scrollAmount,
      behaviour: "smooth ",
    });
  };
  const { movie, similarMovies } = movies;
  return (
    <Wrapper>
      <LazyLoadImage
        className="hero_banner"
        src={imgUrl + movie?.poster_path}
        alt=""
      />
      <div className="main">
        <h1>{movie?.title}</h1>
        <span>{movie?.tagline}</span>
        <p>{movie?.overview}</p>
        <button onClick={callMovieTrailer.bind(null, movie)}>
          Watch Video
        </button>
        <Grid>
          <Chips data={movie?.genres} />
          <Ratings movie={movie} />
        </Grid>
        <div className="similar_cards">
          <h3>Similar</h3>
          {similarMovies.length ? (
            <>
              <Carousel
                movies={similarMovies}
                loading={loading}
                scrollRef={scrollRef}
              />
              <button onClick={() => handleSlide("left")} className="left_btn">
                <div>
                  <MdKeyboardArrowLeft />
                </div>
              </button>
              <button onClick={() => handleSlide(null)} className="right_btn">
                <div>
                  <MdKeyboardArrowRight />
                </div>
              </button>
            </>
          ) : (
            <span className="no_page">No Data found</span>
          )}
        </div>
      </div>
      {!trailerUrl ? null : (
        <VideoPlayer setTrailerUrl={setTrailerUrl} trailerUrl={trailerUrl} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 80px;
  color: #fff;
  display: flex;
  .hero_banner {
    height: 600px;
    margin-right: 16px;
  }
  > .main {
    /* flex-grow: 1; */
    width: calc(100% - 400px - 16px);
  }
  button {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;
    color: #f9f9f9;
    cursor: pointer;
    &:hover {
      background-color: #f9f9f9;
      color: #000;
      border-color: transparent;
    }
  }
  span {
    color: #eee;
    font-size: 10px;
    margin-block: 16px;
  }
  p {
    margin-block: 20px;
  }
  .similar_cards {
    position: relative;
    width: 100%;
    button {
      position: absolute;
      top: 55%;
      opacity: 0.5;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      border: none;
      cursor: pointer;
      text-align: center;
      display: flex;
      z-index: 2;
      justify-content: center;
      padding-top: 5px;
      transition: opacity 500ms ease-in-out;
      &:hover {
        opacity: 1;
      }
      &.left_btn {
        left: 8px;
      }
      &.right_btn {
        right: 8px;
      }
    }
    .no_page {
      color: #fff;
    }
  }
  @media screen and (max-width: 750px) {
    flex-direction: column;
    > .main {
      /* flex-grow: 1; */
      width: 100%;
    }
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 45px;
`;

export default Details;
