import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllEmployees, fetchEmployeeById } from '../../api/fetchData'

const initialState = {
  employees: {},
  employee:{},
};
// Async thunk to fetch employees
export const getAllEmployees = createAsyncThunk('employees/getAll', async (params, thunkAPI) => {
  try {
    const response = await fetchAllEmployees(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const getEmployeeById = createAsyncThunk('employee/getById', async (id, thunkAPI) => {
  try {
    const response = await fetchEmployeeById(id);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});
export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployees.pending, (state) => {
        console.log('Loading employees...');
        console.log('state from employee slice',state)
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        console.log('Successfully fetched employees.');
        state.employees = action.payload; // Store the employees in state
        console.log(state)
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        console.log('Failed to fetch employees.',action.payload);
        // state.error = action.payload; // Store any error that occurred
      }).addCase(getEmployeeById.pending, (state) => {
        console.log('Loading employee by ID...');
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        console.log('Successfully fetched employee by ID.');
        state.employee = action.payload; // Store employee by ID
      })
      .addCase(getEmployeeById.rejected, (state, action) => {
        console.log('Failed to fetch employee by ID.',action.payload);
        // state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
