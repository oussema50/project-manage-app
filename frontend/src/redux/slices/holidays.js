import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllHolidays,fetchHolidaysByEmployeeId, UpdateHolidayRequest,deleteHoliday } from '../../api/fetchHolidy'
import Swal from 'sweetalert2';

const initialState = {
  holidays: [],
  holidaysByEmployee:[],
};
// Async thunk to fetch employees
export const getAllHolidays = createAsyncThunk('holidays/getAll', async (params, thunkAPI) => {
  try {
    const response = await fetchAllHolidays(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const getholidaysByEmployee = createAsyncThunk('holidays/getById', async (params, thunkAPI) => {
  try {
    const response = await fetchHolidaysByEmployeeId(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});
export const updateHoliday = createAsyncThunk('holidays/updateHoliday', async (params, thunkAPI) => {
  try {
    const response = await UpdateHolidayRequest(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});
// deleteHoliday
export const removeHoliday = createAsyncThunk('holidays/deleteHoliday', async (params, thunkAPI) => {
  try {
    const response = await deleteHoliday(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});
export const holidatSlice = createSlice({
  name: 'holiday',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllHolidays.pending, (state) => {
        console.log('Loading holidays...');
        console.log('state from holidays slice',state)
      })
      .addCase(getAllHolidays.fulfilled, (state, action) => {
        console.log('Successfully fetched holidays.');
        state.holidays = action.payload;
        console.log(state)
      })
      .addCase(getAllHolidays.rejected, (state, action) => {
        console.log('Failed to fetch holidays.',action.payload);
        // state.error = action.payload; // Store any error that occurred
      })
      .addCase(getholidaysByEmployee.pending, (state) => {
        console.log('Loading holidays by employeeID...');
      })
      .addCase(getholidaysByEmployee.fulfilled, (state, action) => {
        console.log('Successfully fetched holidays by employeeID.');
        state.holidaysByEmployee = action.payload; 
      })
      .addCase(getholidaysByEmployee.rejected, (state, action) => {
        console.log('Failed to fetch holidays by employeeID.',action.payload);
        // state.error = action.payload;
      })
      .addCase(updateHoliday.pending, (state) => {
        console.log('Loading holidays...');
        console.log('state from holidays slice',state)
      })
      .addCase(updateHoliday.fulfilled, (state, action) => {
        console.log('Successfully fetched holidays.');
        Swal.fire({
          title: "",
          text: 'update successfully',
          icon: "success"
        });
        console.log(state)
      })
      .addCase(updateHoliday.rejected, (state, action) => {
        console.log('Failed to fetch holidays.',action.payload);
        // state.error = action.payload; // Store any error that occurred
      })
      .addCase(removeHoliday.pending, (state) => {
        console.log('Loading holidays...');
        console.log('state from holidays slice',state)
      })
      .addCase(removeHoliday.fulfilled, (state, action) => {
        console.log('Successfully fetched holidays.');
        Swal.fire({
          title: "",
          text: 'deleted successfully',
          icon: "success"
        });
        console.log(state)
      })
      .addCase(removeHoliday.rejected, (state, action) => {
        console.log('Failed to fetch holidays.',action.payload);
        // state.error = action.payload; // Store any error that occurred
      })
  },
});

export default holidatSlice.reducer;
