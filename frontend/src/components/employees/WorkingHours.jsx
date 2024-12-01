import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import { getAllWorkingHour } from '../../redux/slices/workingHours';
import { getLocalStorage } from '../../utils/localStorage';
import { Link, useNavigate } from 'react-router-dom';
import { load, stopLoad } from '../../redux/slices/loading';
import UpdateWorkingHourForm from '../pop-up/UpdateWorkingHour';
import { showUpdateWorkingHour } from '../../redux/slices/popUp';
export const WorkingHours = () => {
  const [employeeId,setEmployeeId] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const workingHours = useSelector(state=>state.workingHours.workingHours)
    const token = useSelector(state=>state.userAuth.token) || getLocalStorage('token')
    const loading = useSelector(state=>state.loading.loading)
    const [currentPage, setCurrentPage] = useState(1);
    const handleRowClick = (id) => {
      navigate(`/all-working-hours/${id}`);
    };
    useEffect(()=>{
      dispatch(load())
      handleRequest([{page:currentPage},token])
      dispatch(stopLoad())
    
    
    },[currentPage])
  
    const handleRequest = ([query,token])=>{
      
      dispatch(getAllWorkingHour([query,token]))
  
    }
    const updateWorkingHour = (id)=>{
      setEmployeeId(id)
      dispatch(showUpdateWorkingHour())
    }

    const deleteWorkingHour = (id)=>{

    }
    const handleNext = () => {
      if (currentPage < workingHours.totalPages) setCurrentPage(currentPage + 1);
      // handleRequest([{page:currentPage},token])
    };
    
    const handlePrevious = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
      // handleRequest([{page:currentPage},token])
    };
  
    return (
      <div className="container mx-auto my-8 p-4">
        <div className="overflow-x-auto shadow-md rounded-lg">
          {loading ? (
            <LoadingSpinner/>
          ) : (
            <>
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold text-gray-800">Working Hours</h2>
               
              </div> 
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Employee Id
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    date
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    startTime
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  endTime
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    status
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    hoursOfWork
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {workingHours.workingHours &&
                  workingHours.workingHours.map((workingHour, index) => (
                    <tr
                      key={index}
                      className={`border-b border-white ${
                        workingHour.status === 'accepted'
                          ? 'bg-green-200 hover:bg-green-400'
                          : workingHour.status === 'rejected'
                          ? 'bg-red-200 hover:bg-red-400'
                          : workingHour.status === 'pending'
                          ? 'bg-yellow-200 hover:bg-yellow-300'
                          : index % 2 === 0
                          ? 'bg-white'
                          : 'bg-gray-50'
                      }  transition-colors duration-200 cursor-pointer`}
                      // onClick={() => handleRowClick(workingHour.id)}
                    >
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.id}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.employeeId}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.User.firstName}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.User.lastName}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.User.email}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.date}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.startTime}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.endTime}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.status}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.hoursOfWork}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">
                        <button
                          onClick={() => updateWorkingHour(workingHour.employeeId)}
                          className="px-4 py-2 mb-4 mr-4 w-20 bg-blue-500 text-white text-sm font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition duration-200"
                        >
                          update
                        </button>
                        <button
                          onClick={() => deleteWorkingHour(workingHour.id)}
                          className="px-4 py-2 w-20 bg-red-500 text-white text-sm font-medium rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition duration-200"
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>

            </table>
            </>
          )}
          <div className="flex justify-between items-center bg-gray-100 p-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <span className="text-sm font-medium text-gray-700">
              Page {currentPage} of {workingHours.totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === workingHours.totalPages}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                currentPage === workingHours.totalPages
                  ? 'bg-gray-300'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
        <UpdateWorkingHourForm id={employeeId} />
      </div>
    );
}
