import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { imgUrl } from "./services/movies";
function WatchHistory() {
  const movies = useSelector((state) => state.movies);
  const nav = useNavigate();
  const data = movies.watchHistory;
  return (
    <Wrapper>
      {data.length ? (
        <div className="grid">
          {data.map((e) => (
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
          ))}
        </div>
      ) : (
        <span className="not_found">No History Found</span>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 80px;
  display: flex;
  .not_found {
    color: #fff;
    display: inline-flex;
    align-items: center;
    height: 400px;
    vertical-align: middle;
    margin: auto;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(125px, 0.4fr));
    gap: 20px;
    width: 100%;
    .carousel_img {
      width: 100%;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.5s ease-in;
      display: block;
      padding: 2px;
      &:hover {
        padding: 0;
        transition-duration: 300ms;
        border: 2px solid #fff;
      }
    }
  }
`;

export default WatchHistory;
