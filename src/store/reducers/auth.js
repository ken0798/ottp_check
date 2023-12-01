import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  token: null,
  user: null,
  viewLogin:false
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state,action) {
      state.token = action.payload.token
    },
    setUser(state, action) {
      state.user = action.payload.value
    },
    toggleLogin(state) {
      state.viewLogin = !state.viewLogin
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken,setUser,toggleLogin} = authSlice.actions

export default authSlice.reducer