import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const Login = () => {
  // Initial form values
  const initialValues = {
    email: '',
    password: '',
  };

  // Validation schema (optional)
  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };

  // Handle form submission
  const onSubmit = (values) => {
    // Your login logic goes here
    console.log('Form submitted with:', values);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 mt-4 rounded-md hover:bg-indigo-700 focus:outline-none"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

