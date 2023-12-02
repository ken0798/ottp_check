import React from "react";
import { styled } from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { imgUrl } from "../services/movies";

function Carousel({ movies = [], loading, scrollRef }) {
  const nav = useNavigate();
  return (
    <Wrapper ref={scrollRef} className="carousel_container">
      {movies?.map((e) => {
        return !loading ? (
          <div
            key={e.id}
            onClick={() => {
              nav(`/details/${e.id}`);
            }}
          >
            <LazyLoadImage
              className="carousel_img"
              effect="blur"
              src={imgUrl + e?.poster_path}
              alt=""
            />
          </div>
        ) : (
          <div key={e.id} className="">
            <div className="skeleton skeleton_img carousel_img"></div>
          </div>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  &.carousel_container {
    display: flex;
    overflow-x: scroll;
    margin-block: 18px;
    gap: 8px;
    height: 200px;
    scroll-behavior: smooth;
    position: relative;
    & > div {
      cursor: pointer;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .carousel_img {
      width: 125px;
      border-radius: 8px;
    }

    .skeleton {
      animation: skeleton-loading 1s linear infinite alternate;
    }
    .skeleton_img {
      height: calc(100% - 25px);
    }

    @keyframes skeleton-loading {
      0% {
        background-color: hsl(200deg 4.08% 13%);
      }
      100% {
        background-color: hsl(200, 2.86%, 31.42%);
      }
    }
  }
`;

export default Carousel;
