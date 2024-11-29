import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    notifications:[],

}

export const notificationSlice = createSlice({
    name: 'natification',
    initialState,
    reducers: {
      addNotification: (state,action) => {
        state.notifications.puth(action.payload)
      },
     
    },
  })

  export const {
    addNotification
  } = notificationSlice.actions
  export default notificationSlice.reducer