import styled from "styled-components";
import ImgSlider from "./component/imgSlider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMovies } from "./services/movies";
import { setNowPlaying } from "./store/reducers/movies";
import Features from "./component/section";

const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const {
        data: { results },
      } = await getMovies("/movie/now_playing");
      console.log(results);
      dispatch(setNowPlaying(results));
    })();
  }, [dispatch]);

  return (
    <>
      <Container>
        <ImgSlider />
      </Container>
      <Features />
    </>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  margin-block: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
