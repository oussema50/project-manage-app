import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    holidayPopUp:false,
    updateHolidayPopUp:false,
    checkOutPopUp:false,
    updateWorkingHour:false,
    updateCheckOutPopUp:false
}

export const popUpSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
      showPopUp: (state) => {
        state.holidayPopUp = true
      },
      hiddenPopUp: (state) => {
        state.holidayPopUp = false
      },
      showUpdateHolidayPopUp:(state)=>{
        state.updateHolidayPopUp = true
      },
      hiddenUpdateHolidayPopUp:(state)=>{
        state.updateHolidayPopUp = false
      },
      showCheckOutPopUp:(state)=>{
        state.checkOutPopUp = true
      },
      hiddenCheckOutPopUp:(state)=>{
        state.checkOutPopUp = false
      },
      showUpdateWorkingHour:(state)=>{
        state.updateWorkingHour = true
      },
      hiddenUpdateWorkingHour:(state)=>{
        state.updateWorkingHour = false
      },
      showUpdateCheckOutPopUp:(state)=>{
        state.updateCheckOutPopUp = true
      },
      hiddenUpdateCheckOutPopUp:(state)=>{
        state.updateCheckOutPopUp = false
      }
    },
  })

  export const {
    showPopUp,
    hiddenPopUp,
    showUpdateHolidayPopUp,
    hiddenUpdateHolidayPopUp,
    showCheckOutPopUp,
    hiddenCheckOutPopUp,
    showUpdateWorkingHour,
    hiddenUpdateWorkingHour,
    showUpdateCheckOutPopUp,
    hiddenUpdateCheckOutPopUp
  } = popUpSlice.actions
  export default popUpSlice.reducer