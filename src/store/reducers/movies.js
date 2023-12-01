import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nowPlaying: [],
  popular: [],
  trended: [],
  upComing:[]
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
    }
  },
})

// Action creators are generated for each case reducer function
export const { setNowPlaying,
  setPopular,
  setUpcoming,
  setTrending} = movieSlice.actions

export default movieSlice.reducer