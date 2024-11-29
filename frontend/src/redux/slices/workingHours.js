import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { checkIn, fetchWorkingHours,fetchWorkingHoursByEmployee, updateCheckOutRequest, UpdateWorkingHourRequest } from '../../api/fetchWorkingHour'
import { load, stopLoad } from './loading';
import { checkOutRequest } from '../../api/checkOutApi';
import Swal from 'sweetalert2';

const initialState = {
  workingHours: {},
  workingHoursByEmployee:{},
  employeeWorkingToday:[]
};

export const getAllWorkingHour = createAsyncThunk('workingHour/getAll', async (params, thunkAPI) => {
  try {
    const response = await fetchWorkingHours(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const getWorkingHoursByEmployee = createAsyncThunk('workingHour/getById', async (params, thunkAPI) => {
  try {
    console.log('params ===========>>>>' ,params)
    thunkAPI.dispatch(load());
    const response = await fetchWorkingHoursByEmployee(params);
    thunkAPI.dispatch(stopLoad());

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});
export const checkInEmployee = createAsyncThunk('workingHour/checkInEmployee', async (params, thunkAPI) => {
  try {
    const response = await checkIn(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//checkOutRequest
export const checkOutEmployee = createAsyncThunk('workingHour/checkOutEmployee', async (params, thunkAPI) => {
  try {
    const response = await checkOutRequest(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});
// UpdateWorkingHourRequest
export const updateWorkingHourStatus= createAsyncThunk('workingHour/updateWorkingHourStatus', async (params, thunkAPI) => {
  try {
    const response = await UpdateWorkingHourRequest(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});
export const udpateCheckOutStatus = createAsyncThunk('workingHour/udpateCheckOutStatus', async (params, thunkAPI) => {
  try {
    const response = await updateCheckOutRequest(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});
export const workingHourSlice = createSlice({
  name: 'working hour',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWorkingHour.pending, (state) => {
        console.log('Loading workingHour...');
        console.log('state from workingHour slice',state)
      })
      .addCase(getAllWorkingHour.fulfilled, (state, action) => {
        console.log('Successfully fetched workingHour.');
        state.workingHours = action.payload;
        console.log(state)
      })
      .addCase(getAllWorkingHour.rejected, (state, action) => {
        console.log('Failed to fetch workingHour.',action.payload);
        // state.error = action.payload; // Store any error that occurred
      }).addCase(getWorkingHoursByEmployee.pending, (state) => {
        console.log('Loading workingHour by employeeID...');
      })
      .addCase(getWorkingHoursByEmployee.fulfilled, (state, action) => {
        console.log('Successfully fetched workingHour by employeeID.');
        state.workingHoursByEmployee = action.payload; 
      })
      .addCase(getWorkingHoursByEmployee.rejected, (state, action) => {
        console.log('Failed to fetch workingHour by employeeID.',action.payload);
        // state.error = action.payload;
      }).addCase(updateWorkingHourStatus.pending, (state) => {
        console.log('Loading workingHour by employeeID...');
      })
      .addCase(updateWorkingHourStatus.fulfilled, (state,action) => {
        console.log('Successfully fetched workingHour by employeeID.',action.payload);
        Swal.fire({
          title: "",
          text: 'update successfully',
          icon: "success"
        });
      })
      .addCase(updateWorkingHourStatus.rejected, (state, action) => {
        console.log('Failed to fetch workingHour by employeeID.',action.payload);
        Swal.fire({
            icon: "error",
            text: action.payload,
          });
        // state.error = action.payload;
      }).addCase(udpateCheckOutStatus.pending, (state) => {
        console.log('Loading workingHour by employeeID...');
      })
      .addCase(udpateCheckOutStatus.fulfilled, (state,action) => {
        console.log('Successfully fetched workingHour by employeeID.',action.payload);
        Swal.fire({
          title: "",
          text: 'update successfully',
          icon: "success"
        });
      })
      .addCase(udpateCheckOutStatus.rejected, (state, action) => {
        console.log('Failed to fetch workingHour by employeeID.',action.payload);
        Swal.fire({
            icon: "error",
            text: action.payload,
          });
        // state.error = action.payload;
      });
  },
});
export default workingHourSlice.reducer;
