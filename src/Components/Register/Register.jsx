import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import joi from 'joi'


export default function Register() {
const [user, setUser] = useState({
  first_name:'',
last_name:'',
age:'',
email:'',
password:'',}) 

const [errorMsg, setErrorMsg] = useState('')
const [errorList, setErrorList] = useState([])
let navigate=useNavigate()


let getInputData=(e)=>{
let myUser={...user};
myUser[e.target.name]=e.target.value;
setUser(myUser);
console.log(myUser);

}

 let submitFormData=async(e)=>{
    e.preventDefault();

    let validationResponse=validateFormData()
    console.log(validationResponse)

    if(validationResponse.error)
    {
setErrorList(validationResponse.error.details)

    }
    else{
 let {data}= await axios.post("https://sticky-note-fe.vercel.app/signup",user);

   if (data.message ==='success')
   {
     goToLogin()
   }
   else
 {
   setErrorMsg(data.message)
 }
console.log(data);
  }


    }
  let goToLogin=()=>{
  navigate('/login')
}                                                                     

let validateFormData=()=>{

  let schema=joi.object({
first_name:joi.string().alphanum().required().min(2).max(20),
last_name:joi.string().alphanum().required().min(2).max(20),
age:joi.number().required().min(20).max(80),
email:joi.string().required().email({tlds:{allow:['com','net']}}),
password:joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/))


  })
return schema.validate(user,{abortEarly:false})

}




  return (

<>
<div className=' my-5 w-75 m-auto'>
  <h2 className='my-3' >Registeration Form</h2>

  {errorList.map((error,index)=>
    <div key={index} className='alert alert-danger p-2'>{error.message}</div>
  ) }
  {errorMsg?<div className='alert alert-danger p-2'>{errorMsg}</div>:''}
  <form onSubmit={submitFormData} >
<div className="input-data">
  <label htmlFor="first_name">First name</label>
  <input onChange={getInputData} className='form-control my-2' type="text" name='first_name' />
</div>
<div className="input-data">
  <label htmlFor="last_name">last name</label>
  <input onChange={getInputData} className='form-control my-2' type="text" name='last_name' />
</div>
<div className="input-data">
  <label htmlFor="age">Age</label>
  <input onChange={getInputData} className='form-control my-2' type="number" name='age' />
</div>
<div className="input-data">
  <label htmlFor="email">Email</label>
  <input onChange={getInputData} className='form-control my-2' type="email" name='email' />
</div>
<div className="input-data">
  <label htmlFor="password">Password</label>
  <input onChange={getInputData} className='form-control my-2' type="password" name='password' />
</div>
<button className='btn btn-info float-end my-3'>Register</button>
<div className="clear-fix"></div>
  </form>
</div>

</>

    )
}


