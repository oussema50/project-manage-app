import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import { hiddenUpdateCheckOutPopUp } from "../../redux/slices/popUp";
import { getAllHolidays } from '../../redux/slices/holidays';
import axios from "axios";
import { getLocalStorage } from "../../utils/localStorage";
import Swal from "sweetalert2";
import Notification from "../Notifications";
import { getAllWorkingHour, udpateCheckOutStatus } from "../../redux/slices/workingHours";
const UpdateCheckOutPopUp = ({id}) => {
    const initialValues = {
        employeeId: id,
        checkOutStatus: "",
      };
    const dispatch = useDispatch()
    const updateCheckOutPopUp = useSelector(state=>state.popUp.updateCheckOutPopUp)
    const token = useSelector(state=>state.userAuth.token) || getLocalStorage('token')
    // const notifications = useSelector(state=>state.notification.notifications)
    const validationSchema = Yup.object().shape({
        employeeId: Yup.string().required("Employee ID is required"),
        checkOutStatus: Yup.string().required("Status is required"),
        
      });
      

 

  const handleSubmit = async(values, { resetForm }) => {
    try{
        console.log('values from update checkout pop up ===== ',values)
        await dispatch(udpateCheckOutStatus([values,token]))
        // dispatch(getAllWorkingHour([{},token]))
          
        // Swal.fire({
        //     title: "",
        //     text: response.data.msg,
        //     icon: "success"
        //   }); 
    }catch(error){
        
        // Swal.fire({
        //     icon: "error",
        //     text: error.response.data.message,
        //   });
        console.log(error.response.data.message)
    }
    resetForm();
    dispatch(hiddenUpdateCheckOutPopUp())
  };
  return (
   <div>
    {updateCheckOutPopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">check-out Update</h2>
            <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    >
                    {({ values }) => (
                    <Form className="max-w-lg mx-auto p-4 bg-white rounded shadow">
                        {/* Employee ID Input */}
                        <div className="mb-4">
                        <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                            Employee ID
                        </label>
                        <Field
                            id="employeeId"
                            name="employeeId"
                            type="text"
                            value={id}
                            placeholder="Enter Employee ID"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <ErrorMessage
                            name="employeeId"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                        </div>

                        {/* Status Dropdown */}
                        <div className="mb-4">
                        <label htmlFor="checkOutStatus" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <Field
                            as="select"
                            id="checkOutStatus"
                            name="checkOutStatus"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="" label="Select" />
                            <option value="accepted" label="accepted" />
                            <option value="rejected" label="rejected" />
                        </Field>
                        <ErrorMessage
                            name="checkOutStatus"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                        </div>

                        {/* {values.status === "rejected" && (
                        <div className="mb-4">
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                            Reason for Rejection
                            </label>
                            <Field
                            as="textarea"
                            id="reason"
                            name="reason"
                            placeholder="Enter reason for rejection"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <ErrorMessage
                            name="reason"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                            />
                        </div>
                        )} */}
                        <div className="flex justify-end gap-4">
                            
                            <button
                                type="button"
                                onClick={() => dispatch(hiddenUpdateCheckOutPopUp())}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                            Submit
                            </button>
                        </div>
                    </Form>
                    )}
                </Formik>
          </div>
        </div>
      )}
      {/* <Notification employeeId = {id}/> */}
   </div>
  );
};

export default UpdateCheckOutPopUp;
