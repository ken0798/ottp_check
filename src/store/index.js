import { configureStore } from '@reduxjs/toolkit'
import authSlice  from './reducers/auth'
import movieSlice  from './reducers/movies'

export const store = configureStore({
  reducer: {
    user: authSlice,
    movies:movieSlice
  },
})