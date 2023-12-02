import React, { useEffect,useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useSelector,useDispatch} from 'react-redux'
import { getMovies, imgUrl } from './services/movies';
import { setMovie } from './store/reducers/movies';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {styled} from 'styled-components'

function Details() {
  const { id:movie_id } = useParams()
  const dispatch = useDispatch()
  const nav = useNavigate()
  const movies = useSelector(state => state.movies)
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    (async () => {
      (async () => {
        setLoading(true)
        try {
          const {data:results} = await getMovies(`/movie/${movie_id}`)
          console.log(results);
          setLoading(false)
          dispatch(setMovie (results))
        } catch (error) {
          setLoading(false)
        }
      })()
    })()
  },[])
  return (
    <Wrapper>
      <LazyLoadImage className='hero_banner' src={imgUrl + movies.movie?.poster_path} alt='' />
      <div>
        
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  .hero_banner{
    height: 600px;
    margin-top: 70px;
  }
  `


export default Details