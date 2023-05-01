import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Masterlayout from '../Masterlayout/Masterlayout';
import Home from '../Home/Home';
import Details from '../Details/Details';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import People from '../People/People';
import Tvshows from '../Tvshows/Tvshows';
import Register from '../Register/Register';
import Notfound from '../Notfound/Notfound';
import Networks from '../Networks/Networks';
import About from '../About/About';
import Logout from '../Logout/Logout';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode'
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
const [userData, setUserData] = useState(null)

let saveUserData=()=>{
let encodedToken=localStorage.getItem("token")
let decodedToken=jwtDecode(encodedToken)
setUserData(decodedToken)
}

useEffect(() => {
if(localStorage.getItem('token'))
{
  saveUserData()
}

}, [])

let logOut=()=>{

  localStorage.removeItem("token")
  setUserData(null)
  return <Navigate to='login'/>
}

let routes=createBrowserRouter([{path:'',element:<Masterlayout logOut={logOut} userData={userData} />,
errorElement:<Notfound/>,
children:[
  {index:true,element:<ProtectedRoute userData={userData}><Home/></ProtectedRoute>   },
  {path:'Networks',element:<ProtectedRoute userData={userData}><Networks/></ProtectedRoute>},
  {path:'About',element:<ProtectedRoute userData={userData}><About/></ProtectedRoute>},
  {path:'Details/:id/:mediatype',element:<ProtectedRoute userData={userData}><Details/></ProtectedRoute>},
  {path:'Movies',element:<ProtectedRoute userData={userData}><Movies/></ProtectedRoute>},
  {path:'People',element:<ProtectedRoute userData={userData}><People/></ProtectedRoute>},
  {path:'Tvshows',element:<ProtectedRoute userData={userData}><Tvshows/></ProtectedRoute>},
  {path:'Login',element:<Login saveUserData={saveUserData}  />},
  {path:'Register',element:<Register/>},
  {path:'Logout',element:<Logout/>},
  {path:'Profile',element:<ProtectedRoute userData={userData}> <Profile userData={userData}/></ProtectedRoute>},

]}])

  return (
   <>
   <RouterProvider router={routes} />
   
   
   </>
  );
}

export default App;
