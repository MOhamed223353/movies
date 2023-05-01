import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import joi from 'joi'
export default function Login({saveUserData}) {
  let navigate=useNavigate()
  const [errorList, setErrorList] = useState([])
const [user, setUser] = useState({
email:'',
password:'',
})

const [errorMsg, setErrorMsg] = useState('')
  let submitFormData=async(e)=>{
    e.preventDefault();
    let validationResponse=validateFormData()
    if(validationResponse.error)
    {
setErrorList(validationResponse.error.details)
    }
    else
    {
      let {data}= await axios.post('https://sticky-note-fe.vercel.app/signin',user)

      if(data.message==='success')
      {
      goToHome()
      localStorage.setItem('token',data.token)
      saveUserData()
      }
      else
      {
      setErrorMsg(data.message)
      }
    }


  }

  let getInputData=(e)=>{
    let myUser={...user}
    myUser[e.target.name]=e.target.value
    setUser(myUser)
    console.log(myUser)
  }

let goToHome=()=>{
  navigate('/')
}
let validateFormData=()=>{

let schema=joi.object({
email:joi.string().required().email({tlds:{allow:['com','net']}}),
password:joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/)),

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
  <label htmlFor="email">Email</label>
  <input onChange={getInputData} className='form-control my-2' type="text" name='email' />
</div>
<div className="input-data">
  <label htmlFor="password">Password</label>
  <input onChange={getInputData} className='form-control my-2' type="password" name='password' />
</div>
<button className='btn btn-info float-end my-3'>Login</button>
<div className="clear-fix"></div>
  </form>


  </div>





</>


    )
}
