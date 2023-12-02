import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nowPlaying: [],
  popular: [],
  trended: [],
  upComing: [],
  movie: null,
  watchHistory:[]
}

export const movieSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNowPlaying(state,action) {
      state.nowPlaying = action.payload
    },
    setPopular(state, action) {
      state.popular = action.payload
    },
    setUpcoming(state,action) {
      state.upComing= action.payload
    },
    setTrending(state, action) {
      state.trended = action.payload
    },
    setMovie(state, action) {
      state.movie = action.payload
    },
    setHistory(state, action) {
      state.watchHistory = [...state.watchHistory,action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { setNowPlaying,
  setPopular,
  setUpcoming,
  setTrending,setMovie,setHistory} = movieSlice.actions

export default movieSlice.reducer