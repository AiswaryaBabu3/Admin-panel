import './FormHook.css'
import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useForm } from 'react-hook-form'

function Registration(){
    const { register, 
        formState: {errors}, 
        handleSubmit,
     } = useForm();
     const onSubmit = (data) => console.log(data);
     console.log(errors);
    return (
<div className='body'>
        <div className='form'>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='h11'> LOGIN REGISTER </h1>
        {/*username input*/}
        <label>Name :-</label>
        <input type="text" 
        placeholder="username" 
        className='input'{...register("username",{ required: true, pattern:/^[a-zA-Z0-5]+$/})}/>
           <p className='span'> 
            {errors.username?.type === "required" && "the username is required" }
            {errors.username?.type === "pattern" && "the username is invalid" }
            </p> 
            {/*email input*/} 
            <label>E-mail :-</label>    
        <input type="email" placeholder="email" className='input'
        {...register("email",{required:true,  pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}/>
        <p className='span'>
            {errors.email?.type === "required" && "the email is required"}
            {errors.email?.type === "pattern" && "the givn email is invalid"}
        </p>
        {/*password input*/}
        <label>Password :-</label>
        <input type='password' placeholder='password' className='input'
        {...register("password",{required:true, pattern:/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/})}/>
       <p className='span'> 
       {errors.password?.type === "required" && "the password is required"}
       {errors.password?.type === "pattern" && "the password is invalid"}
       </p>
       {/*phonenumber*/}
       <label>Phone no :-</label>
       <input type='tel' placeholder='Phoneno' className='input'
       {...register("tel",{required:true, pattern:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/})}/>
 <p className='span'> 
       {errors.tel?.type === "required" && "the phoneno is required"}
       {errors.tel?.type === "pattern" && "the phoneno is invalid"}
       </p>
       {/*radiobutton for gender*/}
<label>Gender:-</label>
<label className='gen'>female </label>
<input type='radio' value='female' name='gender'
{...register("gender",{required:true,})}/>
<label className='gen'>Male </label>
<input type='radio'name='gender' value='male'
{...register("gender",{required:true})}/>
<label className='gen'>Others </label>
<input type='radio'name='gender' value='others'
{...register("gender",{required:true})}/>
<p className='span'>
    {errors.gender?.type === "required" && "select gender"}
</p>

       {/*dropdown*/}
<label>State :-</label>
<select name="state" className='input' 
  {...register("state",{required:true})}>
  <option>-select-</option>
  <option>Tamilnadu</option>
  <option>Kerala</option>
  <option>Andhra Pradesh</option>
  <option>Karnataka</option>
  <option>Delhi</option>
  <option>Mumbai</option>
</select>
<p className='span'>
{errors.state?.type === "required" && "please select one option" }
</p>
{/*checkbox for skills*/}
<label>Skills :- </label>
<label className='check'>HTML</label>
<input type='checkbox' value='html' name='skill'
{...register('skill',{required:true})} />
<label className='check'>CSS</label>
<input type='checkbox' value='css' name='skill' 
{...register('skill',{required:true})} />
<label className='check'>JAVASCRIPT</label>
<input type='checkbox' value='javascript' name='skill' 
{...register('skill',{required:true})} />
<label className='check'>REACT JS</label>
<input type='checkbox' value='reactjs' name='skill' 
{...register('skill',{required:true})} />
<label className='check'>NODE JS</label>
<input type='checkbox' value='nodejs' name='skill' 
{...register('skill',{required:true})} />
<label className='check'>PHP</label>
<input type='checkbox' value='php' name='skill' 
{...register('skill',{required:true})} />
<label className='check'>PYTHON</label>
<input type='checkbox' value='python' name='skill'
{...register('skill',{required:true})} />
<label className='check'>SQL</label>
<input type='checkbox' value='sql' name='skill' 
{...register('skill',{required:true})} />
<p className='span'>
{errors.skill?.type === "required" && "select skills"}
</p>



{/*submit button*/}
        <br/>
        <Button type="submit" className='submit'>Submit</Button>
        </form>
        </div></div>
    )

}
export default Registration;