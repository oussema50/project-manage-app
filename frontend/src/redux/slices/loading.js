import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading:false
}

export const loadSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
      load: (state) => {
        state.loading = true
      },
      stopLoad: (state) => {
        state.loading = false
      }
      
    
    },
  })

  export const {load,stopLoad} = loadSlice.actions
  export default loadSlice.reducer