import React from "react";
import { styled } from "styled-components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function Ratings({ movie }) {
  return (
    <Wrapper>
      <h3 style={{ marginBlock: "16px" }}>Ratings</h3>
      <CircularProgressbar
        className="rating"
        value={movie?.vote_average * 10}
        text={`${(movie?.vote_average * 10).toFixed(1)}%`}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .rating {
    width: 40px;
    height: 40px;
  }
  .CircularProgressbar-path {
    stroke: green !important;
  }
  .CircularProgressbar-trail {
    stroke: transparent !important;
  }
  .CircularProgressbar-text {
    fill: #f9f9f9 !important;
  }
`;

export default Ratings;
