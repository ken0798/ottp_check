import axios from "axios"
const baseUrl = 'https://api.themoviedb.org/3'
const AuthToken = process.env.REACT_APP_TMDB_KEY
export const imgUrl = 'http://image.tmdb.org/t/p/original'
const headers = {
  accept: 'application/json',
  Authorization:`Bearer ${AuthToken}`
}

export const getMovies = (path) => axios.get(`${baseUrl}/movie/${path}`, {
  headers,
}).then((res)=>res).catch((e)=>e)