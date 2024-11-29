import { createSlice } from '@reduxjs/toolkit'
import {setLocalStorage,removeLocalStorage} from '../../utils/localStorage'
const initialState = {
    user:null,
    token:null
}

export const userSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
      login: (state,action) => {
        state.user = action.payload.user
        state.token = action.payload.token
      },
      logout: (state) => {
        removeLocalStorage('user')
        state.user = null
      },
      
    
    },
  })

  export const {login,logout} = userSlice.actions
  export default userSlice.reducer