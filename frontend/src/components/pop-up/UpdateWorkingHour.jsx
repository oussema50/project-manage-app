import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import { hiddenUpdateWorkingHour } from "../../redux/slices/popUp";
import axios from "axios";
import { getLocalStorage } from "../../utils/localStorage";
import Swal from "sweetalert2";
import Notification from "../Notifications";
import { getAllWorkingHour, getWorkingHoursByEmployee, updateWorkingHourStatus } from "../../redux/slices/workingHours";
const UpdateWorkingHourForm = ({id}) => {
    const initialValues = {
        id: id,
        status: "",
        reason: "",
      };
    const dispatch = useDispatch()
    const updateWorkingHour = useSelector(state=>state.popUp.updateWorkingHour)
  const workingHours = useSelector(state=>state.workingHours.workingHours)

    const token = useSelector(state=>state.userAuth.token) || getLocalStorage('token')
    const validationSchema = Yup.object().shape({
        id: Yup.string().required("Employee ID is required"),
        status: Yup.string().required("Status is required"),
        reason: Yup.string()
          .test("reason-required", "Reason is required for rejection", function (value) {
            const { status } = this.parent; // Access sibling fields
            if (status === "rejected") {
              return !!value; // Return true if value exists
            }
            return true; // Always pass if status is not "rejected"
          }),
      });

  const handleSubmit = async(values, { resetForm }) => {
    try{
       await dispatch(updateWorkingHourStatus([values,token]))
        dispatch(getAllWorkingHour([{},token]))
        dispatch(getWorkingHoursByEmployee([id,{page:1},token]))  
    }catch(error){
        
        // Swal.fire({
        //     icon: "error",
        //     text: error.response.data.message,
        //   });
        console.log(error.response.data.message)
    }
    resetForm();
    dispatch(hiddenUpdateWorkingHour())
  };
  return (
   <div>
    {updateWorkingHour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Holiday Request</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    >
                    {({ values }) => (
                    <Form className="max-w-lg mx-auto p-4 bg-white rounded shadow">
                        {/* Employee ID Input */}
                        <div className="mb-4">
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                            Employee ID
                        </label>
                        <Field
                            id="id"
                            name="id"
                            type="text"
                            value={id}
                            placeholder="Enter Employee ID"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <ErrorMessage
                            name="id"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                        </div>

                        {/* Status Dropdown */}
                        <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <Field
                            as="select"
                            id="status"
                            name="status"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="" label="Select status" />
                            <option value="accepted" label="accepted" />
                            <option value="rejected" label="rejected" />
                        </Field>
                        <ErrorMessage
                            name="status"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                        </div>

                        {values.status === "rejected" && (
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
                        )}
                        <div className="flex justify-end gap-4">
                            
                            <button
                                type="button"
                                onClick={() => dispatch(hiddenUpdateWorkingHour())}
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
   </div>
  );
};

export default UpdateWorkingHourForm;
