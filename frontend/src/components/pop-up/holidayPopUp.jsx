import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import { hiddenPopUp } from "../../redux/slices/popUp";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getLocalStorage } from "../../utils/localStorage";
import Toast from "../../utils/toast";
import Swal from "sweetalert2";
const HolidayPopupForm = () => {
    const {id} = useParams()
  const dispatch = useDispatch()
  const holidayPopUp = useSelector(state=>state.popUp.holidayPopUp)
  const token = useSelector(state=>state.userAuth.token) || getLocalStorage('token')

  const validationSchema = Yup.object({
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
  });
//   /holiday-request/:id

  const handleSubmit = async(values, { resetForm }) => {
    console.log("Holiday Request:", values);
    try{
        const response = await axios.post(`http://localhost:5001/api/v1/holiday/holiday-request/${id}`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response)
          Swal.fire({
            title: "",
            text: response.data.msg,
            icon: "success"
          });
    }catch(error){
        
        Swal.fire({
          id:"swall-error",
            icon: "error",
            text: error.response.data.message,
          });
        console.log(error.response.data.message)
    }
    resetForm();
    dispatch(hiddenPopUp())
  };

  return (
    <div>
      {holidayPopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Holiday Request</h2>
            <Formik
              initialValues={{ startDate: "", endDate: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-gray-700">Start Date</label>
                    <Field
                      type="date"
                      name="startDate"
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">End Date</label>
                    <Field
                      type="date"
                      name="endDate"
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                    <ErrorMessage
                      name="endDate"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => dispatch(hiddenPopUp())}
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

export default HolidayPopupForm;
