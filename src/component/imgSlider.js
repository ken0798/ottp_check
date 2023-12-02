import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { imgUrl } from "../services/movies";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import moment from "moment";
import axios from "axios";
import YouTube from "react-youtube";
import { useState } from "react";
import { setHistory } from "../store/reducers/movies";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./videoPlayer";

const API_KEY = "cf368287dabf371a97e4e78fe0dd33ed";

const ImgSlider = (props) => {
  const dispatch = useDispatch();
  const [trailerUrl, setTrailerUrl] = useState(null);
  const nav = useNavigate();
  const getMovieTrailer = async (movie) => {
    try {
      const detailsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`
      );

      const videos = detailsResponse.data.videos.results;
      const trailer = videos.find(
        (video) => video.type === "Trailer" || "Clip"
      );

      const youtubeUrl = trailer.key;

      return youtubeUrl;
    } catch (error) {
      console.error("Error fetching movie information:", error);
      return null;
    }
  };

  const callMovieTrailer = async (movie, e) => {
    e.stopPropagation();
    dispatch(setHistory(movie));
    const url = await getMovieTrailer(movie);
    setTrailerUrl(url);
    if (!trailerUrl) {
      return <div>Loading...</div>;
    }
  };
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  const movies = useSelector((state) => state.movies);
  console.log(movies?.watchHistory);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <>
      <Carousel {...settings}>
        {movies?.nowPlaying.map((e) => (
          <Wrap
            onClick={() => {
              nav(`/details/${e.id}`);
            }}
            key={e.id}
            time={moment(e.release_date).format("ll")}
          >
            <a>
              <LazyLoadImage
                effect="blur"
                src={imgUrl + e?.backdrop_path}
                alt=""
              />
              <div>
                <h1>{e.title}</h1>
                <p>{e.overview}</p>
                <button onClick={callMovieTrailer.bind(null, e)}>
                  Watch Video
                </button>
              </div>
            </a>
          </Wrap>
        ))}
      </Carousel>
      {trailerUrl && (
        <VideoPlayer trailerUrl={trailerUrl} setTrailerUrl={setTrailerUrl} />
      )}
    </>
  );
};

const Carousel = styled(Slider)`
  margin-top: 20px;
  min-height: 500px;
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  .slick-dots {
    bottom: 15px;
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  a {
    height: 450px;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;

    span {
      height: 100%;
      width: 100%;
      display: inline-block;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }

    div {
      position: absolute;
      background-color: rgb(0 0 0 / 49%);
      padding: 40px;
      inset: 0;
      h1 {
        position: relative;
        &:after {
          content: "- released on ${(props) => props.time}";
          font-size: 10px;
          font-weight: 100;
          position: absolute;
          bottom: -11px;
          color: #fff;
        }
        margin-bottom: 20px;
      }
      p {
        font-size: 15px;
        font-weight: 400;
        color: #dbdbdbdd;
      }
      button {
        margin-block: 20px;
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
    }

    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;

export default ImgSlider;
