import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { getMovies } from "../services/movies";
import { setTrending } from "../store/reducers/movies";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Carousel from "./carousel";

function Features({ data }) {
  const [active, setActive] = useState("day");
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  function handleTabs(e) {
    console.log(e.target.ariaLabel);
    setActive(e.target.ariaLabel);
  }
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const {
          data: { results },
        } = await getMovies(`/trending/all/${active}`);
        console.log(results);
        setLoading(false);
        dispatch(setTrending(results));
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [active]);

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

  return (
    <Container>
      <div className="title">
        <h1>Trending</h1>
        <div className="tab">
          <span
            aria-label="day"
            onClick={handleTabs}
            className={active === "day" ? "active" : ""}
          >
            Day
          </span>
          <span
            aria-label="week"
            onClick={handleTabs}
            className={active === "week" ? "active" : ""}
          >
            Week
          </span>
        </div>
      </div>
      <Carousel
        movies={movies?.trended}
        loading={loading}
        scrollRef={scrollRef}
      />
      <button onClick={() => handleSlide("left")} className="left_btn">
        <MdKeyboardArrowLeft />
      </button>
      <button onClick={() => handleSlide(null)} className="right_btn">
        <MdKeyboardArrowRight />
      </button>
    </Container>
  );
}

const Container = styled.section`
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  button {
    position: absolute;
    top: 45%;
    opacity: 0.5;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    border: none;
    cursor: pointer;
    text-align: center;
    z-index: 2;
    transition: opacity 500ms ease-in-out;
    &:hover {
      opacity: 1;
    }
    &.left_btn {
      left: 16px;
    }
    &.right_btn {
      right: 16px;
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tab {
    background-color: white;
    min-width: 300px;
    min-height: 30px;
    border-radius: 40px;
    color: black;
    display: flex;
    justify-content: space-between;
    padding: 4px;
    & > span {
      cursor: pointer;
      flex-basis: 50%;
      align-self: stretch;
      text-align: center;
      padding-block: 5px;
      &.active {
        color: white;
        border-radius: 40px;
        background-color: orangered;
      }
    }
  }
`;

export default Features;
