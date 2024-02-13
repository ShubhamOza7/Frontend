import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pagesCSS/loginCSS.css";
import { sendDataToBackend } from "../inc/apiService";

function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      validateData(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(formValues));
    console.log(Object.keys(formErrors).length);
    if (Object.keys(formErrors).length === 0) {
      console.log(isSubmit);
      validateData(formValues);
    }
  };

  const validateData = async (formData) => {
    const endpointPath = "checklogin";
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const responseData = await sendDataToBackend(
        endpointPath,
        JSON.stringify(formData),
        headers
      );
      if (responseData.message === "User Authenticated") {
        alert(responseData.message);
        navigate("/upload");
      }
    } catch (error) {
      console.error("Failed login:", error);
    }
  };



  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-content">
          <h2 className="login-heading">Log In</h2>
          <p className="login-subheading">Please enter your credentials</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                className="form-control"
              />
              <p className="error-text">{formErrors.email}</p>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                className="form-control"
              />
              <p className="error-text">{formErrors.password}</p>
            </div>
            <button type="submit" className="login-button">Log In</button>
          </form>
          <p className="signup-text">
            Don't have an account? <Link to="/signin">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
