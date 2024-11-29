import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk';
import userReducer  from './slices/auth'
import loadReducer from './slices/loading'
import employeeReducer from './slices/employees'
import workingHourReducer  from './slices/workingHours';
import holidayReducer from './slices/holidays'
import holidayPopUp from './slices/popUp';
import notificationReducer from './slices/notification'
export const storeApp = configureStore({
  reducer: {
    userAuth:userReducer,
    loading:loadReducer,
    employees:employeeReducer,
    workingHours:workingHourReducer,
    holidays:holidayReducer,
    popUp:holidayPopUp,
    notification:notificationReducer,
    middleware: [thunk]
  }
})