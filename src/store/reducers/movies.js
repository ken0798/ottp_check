import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: [],
  movie: null,
  watchHistory: JSON.parse(localStorage.getItem("history")) || [],
  similarMovies: [],
};

export const movieSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNowPlaying(state, action) {
      state.nowPlaying = action.payload;
    },
    setPopular(state, action) {
      state.popular = action.payload;
    },
    setUpcoming(state, action) {
      state.upComing = action.payload;
    },
    setTrending(state, action) {
      state.trended = action.payload;
    },
    setMovie(state, action) {
      state.movie = action.payload;
    },
    setHistory(state, action) {
      const movieId = action.payload.id;
      const movieList = state.watchHistory?.find((e) => e.id === movieId);
      if (!movieList)
        state.watchHistory = [...state.watchHistory, action.payload];
      localStorage.setItem("history", JSON.stringify(state.watchHistory));
    },
    setSimilarMovies(state, action) {
      state.similarMovies = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setNowPlaying,
  setPopular,
  setUpcoming,
  setTrending,
  setMovie,
  setHistory,
  setSimilarMovies,
} = movieSlice.actions;

export default movieSlice.reducer;
