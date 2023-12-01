import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {useSelector} from 'react-redux'
import { imgUrl } from "../services/movies";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import moment from "moment";

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const movies = useSelector(state=>state.movies)
  return (
    <Carousel {...settings}>
      {
        movies?.nowPlaying.map((e) => (
        <Wrap key={e.id} time={moment(e.release_date).format('ll')}>
            <a>
              <LazyLoadImage effect="blur" src={imgUrl + e?.backdrop_path} alt="" />
              <div>
                <h1>{e.title}</h1>
                <p>{e.overview }</p>
              </div>
          </a>
        </Wrap>
          
        ))
      }
    </Carousel>
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

  .slick-dots{
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

    span{
      height:100%;
      width: 100%;
      display: inline-block;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }

    div{
      position: absolute;
      background-color: rgb(0 0 0 / 49%);
      padding: 40px;
      inset: 0;
      h1{
        position: relative;
        &:after{
          content: '- released on ${props=>props.time}';
          font-size: 10px;
          font-weight: 100;
          position: absolute;
          bottom: -11px;
          color: #fff;
        }
        margin-bottom: 20px;
      }
      p{
        font-size: 15px;
        font-weight: 400;
        color: #dbdbdbdd;  
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