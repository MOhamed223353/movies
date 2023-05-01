import React from 'react'
import Navbar from '../Navbar/Navbar'
import {Outlet} from 'react-router-dom'

export default function Masterlayout({userData,logOut}) {
  return (
<>
<Navbar logOut={logOut} userData={userData} />
<div className="container">

<Outlet></Outlet>


</div>

</>  )
}
