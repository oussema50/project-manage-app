import React, { useEffect,useState } from 'react';
import { getAllEmployees } from '../redux/slices/employees';
import { useDispatch, useSelector } from 'react-redux';
import { load,stopLoad } from '../redux/slices/loading';
import EmployeesTable from '../components/employees/EmployeesTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { getLocalStorage } from '../utils/localStorage';
import { getAllWorkingHour } from '../redux/slices/workingHours';
import { WorkingHours } from '../components/employees/WorkingHours';
import { CheckOutTable } from '../components/employees/checkOutTable';
import { getAllHolidays } from '../redux/slices/holidays';
import {HolidayTable} from '../components/employees/HolidayTable'
export const DashBord = () => {
  const dispatch = useDispatch()
  const [employeeHoliday,setEmployeeHoliday] = useState(0)
  const [checkOutEmp,setCheckOutEmp] = useState(0)
  const token = useSelector(state=>state.userAuth.token) || getLocalStorage('token')
  const loading = useSelector(state=>state.loading.loading)
  const today = new Date()
  const employees = useSelector(state=>state.employees.employees)
  const holidays = useSelector(state=>state.holidays.holidays)
  const workingHours = useSelector(state=>state.workingHours.workingHours)
  useEffect(()=>{
    dispatch(load())
    dispatch(getAllEmployees([{},token]))
    dispatch(getAllWorkingHour([{},token]))
    dispatch(getAllHolidays([{},token]))
    dispatch(stopLoad())
  },[])
  
 
  useEffect(() => {
    const calculateEmployeeInHoliday = () => {
      let count = 0;

      if (holidays.holidayRequest) {
        holidays.holidayRequest.forEach(holiday => {
          const startDate = new Date(holiday.startDate);
          const endDate = new Date(holiday.endDate);
          const isTodayBetween = today >= startDate && today <= endDate&&holiday.status==="accepted";
          if (isTodayBetween) {
            count += 1;
          }
        });
      }

      setEmployeeHoliday(count);
    };
    const checkOutEmployees = ()=>{
      let count = 0 
      if(workingHours.workingHours){
        workingHours.workingHours.forEach(workinghour => {
          const date = new Date(workinghour.date);
          
          const isTodayBetween = today === date && workinghour.checkOutStatus === 'accepted';
          if (isTodayBetween) {
            count += 1;
          }
        });
        setCheckOutEmp(count)
      }
    }
    calculateEmployeeInHoliday();
    checkOutEmployees();
  }, [holidays, workingHours, today,employeeHoliday]);
  return (
    
    <div className="dashbord">
      <div className='bg-gray-100 min-h-screen p-6'>
        <div className="max-w-7xl mx-auto">
          {loading?<LoadingSpinner/>:
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700">All Employees</h3>
            <h5 className="text-4xl font-bold text-indigo-600">{employees&&employees.totalUsers}</h5>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700">Employees on Holiday</h3>
            <h5 className="text-4xl font-bold text-yellow-600">{holidays.acceptedHolidaysCount}</h5>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700">Checked-Out Employees</h3>
            <h5 className="text-4xl font-bold text-red-600"> {checkOutEmp} </h5>
          </div>
        </div>
          }
          
        </div>
        <EmployeesTable />
        <WorkingHours />
        <CheckOutTable />
        <HolidayTable />
        
      </div>
    </div>
  );
}