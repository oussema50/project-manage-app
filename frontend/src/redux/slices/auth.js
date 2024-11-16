import { createSlice } from '@reduxjs/toolkit'
import {setLocalStorage,removeLocalStorage} from '../../utils/localStorage'
const initialState = {
    user:null
}

export const userSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
      login: (state,action) => {
        setLocalStorage('user',JSON.stringify(action.payload))
        state.user = action.payload
      },
      logout: (state) => {
        removeLocalStorage('user')
        state.user = null
      },
      
    
    },
  })

  export const {login,logout} = userSlice.actions
  export default userSlice.reducer