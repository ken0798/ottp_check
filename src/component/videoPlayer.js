import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { styled } from "styled-components";
import YouTube from "react-youtube";

function VideoPlayer({ trailerUrl, setTrailerUrl }) {
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <Modal>
      <div>
        <IoCloseCircle
          className="close"
          onClick={() => {
            setTrailerUrl("");
          }}
        />
        <YouTube videoId={trailerUrl} opts={opts} />
      </div>
    </Modal>
  );
}

const Modal = styled.div`
  position: fixed;
  inset: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 5;
  > div {
    .close {
      cursor: pointer;
      color: #f9f9f9;
      width: 40px;
      height: 40px;
    }
    background-color: #000;
    width: 75vw;
  }
`;

export default VideoPlayer;
