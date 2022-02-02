import { createSlice } from '@reduxjs/toolkit'
import { User } from '../core'

const initialState = {
  user: new User(),
}

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { uid, email } = action.payload
      state.user = new User(email, uid)
    },
    logout: (state) => {
      state.user.logout()
    },
  },
})

export const userActions = userSlice.actions
export default userSlice.reducer
