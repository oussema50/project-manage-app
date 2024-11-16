import { configureStore } from '@reduxjs/toolkit'
import userReducer  from './slices/auth'
import loadReducer from './slices/loading'
export const storeApp = configureStore({
  reducer: {
    userAuth:userReducer,
    loading:loadReducer
  }
})