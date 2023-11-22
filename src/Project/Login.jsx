import "./Login.css"
import React from "react";
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";



function Login() {
  const navigate = useNavigate();
  const { register,
    formState: {errors}, 
    handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);
  return (
    <div className="loginform">
      <div className="box">
        <div className="boxleft"></div>
        <div className="formarea">
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h11">LOG IN</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Username</Form.Label> 
      <Form.Control type="text" placeholder="Username" name="username"
        {...register("username",{ required: true, pattern:/^[a-zA-Z0-5]+$/})}/>
                <p className="span"> 
            {errors.username?.type === "required" && "the username is required" }
            {errors.username?.type === "pattern" && "the username is invalid" }
            </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password"

        {...register("password",{required:true, pattern:/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/})}/>      
      <p>forgot password<a href="restart">Click here to reset!</a></p>
      <p className='span'> 
       {errors.password?.type === "required" && "the password is required"}
       {errors.password?.type === "pattern" && "the password is invalid"}
       </p>
       </Form.Group>
      <br />
      <Button type="submit" className="button" onClick={()=>navigate("/admin/home")}>Login</Button>
    </form>
    </div>
    </div>
    </div>
  );
}

export default Login;