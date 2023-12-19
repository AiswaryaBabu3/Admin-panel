import "./Login.css";
import React from "react";
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
      
  const onSubmit = (data) => {
    const { username, password } = data;

    // Check if the entered username and password match the expected values
    if (username === 'admin' && password === 'adminpass') {
      // Successful login, navigate to the admin home page
      navigate("/admin/home");
    } else {
      // Display an error message for invalid credentials
      console.log('Invalid username or password');
    }
  };

  return (
    <div className="loginform">
      <div className="box">
        <div className="boxleft"></div>
        <div className="formarea">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="h11">LOG IN</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                {...register("username", { required: true, pattern: /^[a-zA-Z0-5]+$/ })}
              />
              <p className="span">
                {errors.username?.type === "required" && "the username is required"}
                {errors.username?.type === "pattern" && "the username is invalid"}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                {...register("password", {
                  required: true,
                })}
              />
              <p>
                forgot password<a href="restart">Click here to reset!</a>
              </p>
              <p className="span">
                {errors.password?.type === "required" && "the password is required"}
                {errors.password?.type === "pattern" && "the password is invalid"}
              </p>
            </Form.Group>
            <br />
            <Button type="submit" className="button">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
