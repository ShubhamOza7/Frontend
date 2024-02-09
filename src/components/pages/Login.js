import { useState, useEffect } from "react";
import { Col, Row, Container, Card, Form } from "react-bootstrap";
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
    console.log(formErrors);
  }, [formErrors]);

  // validate function
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
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="card-body">
              <div className="mb-3 mt-md-4">
                <h2 className="loginbr fw-bold mb-2 text-uppercase ">Log In</h2>
                <p className="plsenter mb-5">Please enter your credentials</p>
                <div className="mb-3">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="email">
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <p style={{ color: "red" }}>{formErrors.email}</p>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="pass">Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formValues.password}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <p style={{ color: "red" }}>{formErrors.password}</p>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      {/* <p className="small">
                        <a className="forgot text-primary" href="#!">
                          Forgot password?
                        </a>
                      </p> */}
                    </Form.Group>
                    <div className="d-grid">
                      <button type="submit" class="btn btn-primary">
                        {/* <Link to="/dashboard" className="nav-link text-white"> */}
                        Enter
                        {/* </Link> */}
                      </button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don't have an account?{" "}
                      <Link to="/signin" className="text-primary fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
