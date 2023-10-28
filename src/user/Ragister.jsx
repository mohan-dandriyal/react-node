
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SaideBar from './SaideBar'
import "./style.css"
import axios from 'axios';



function Ragister() {

  const [user, setUesr] = useState({
    userName: null,
    userContact: null,
    userEmail: null,
    userPass: null
  })
  const navigate = useNavigate()

  const hendleuser = () => {
    if(user.userName === null){
      toast.warning("enter userName")
    }
    else if(user.userContact === null) {
      toast.warning("enter contact number")
    }
    else if(user.userEmail === null) {
      toast.warning("enter user id")
    }
    else if(user.userPass === null || user.userPass === "") {
      toast.warning("enter password")
    }
    else {
      axios.post("http://localhost:8000/users/post/",user).then((res) => {
        console.log(res);
        toast.success("data is submited")
        navigate('/login')
      }).catch((err) => {
        toast.warning(err.response.data.Message)
      })
    }
  }

  return (
    <div className='container-fluide'>
      <div className="m-0 row align-items-center justify-content-center vh-100 overflow-hidden">
        <div className="col-md-9 text-center px-5 d-flex h-100 align-items-center"
          style={{ backgroundColor: '#030f20', color: '#9d9c9c' }}>
          <SaideBar />
        </div>
        <div className="col-md-3 d-flex h-100 align-items-center" style={{ backgroundColor: '#061a38', color: '#ababad' }}>

          <div className="form w-100 px-2">
            <div className="title col-12 mb-3">
              <h3 style={{ color: '#c2c3c5' }}>Sing Up</h3>
            </div>
            <div className="input-box">
              <div className="form-label">
                <label htmlFor="UserName :">UserName</label>
              </div>
              <div className="form-input">
                <input type="text" className='form-control w-100' onChange={(e) => setUesr((prev) => ({ ...prev, userName: e.target.value }))} />
              </div>
            </div>

            <div className="input-box mt-3">
              <div className="form-label">
                <label htmlFor="UserName :">Contact No</label>
              </div>
              <div className="form-input">
                <input type="text" className='form-control w-100' onChange={(e) => setUesr((prev) => ({ ...prev, userContact: e.target.value }))} />
              </div>
            </div>

            <div className="input-box mt-3">
              <div className="form-label">
                <label htmlFor="UserName :">Email Id</label>
              </div>
              <div className="form-input">
                <input type="Email" className='form-control w-100' onChange={(e) => setUesr((prev) => ({ ...prev, userEmail: e.target.value }))} />
              </div>
            </div>

            <div className="input-box mt-3">
              <div className="form-label">
                <label htmlFor="UserName :">Password</label>
              </div>
              <div className="form-input">
                <input type="Password" className='form-control w-100' onChange={(e) => setUesr((prev) => ({ ...prev, userPass: e.target.value }))} />
              </div>
            </div>

            <div className="submit-btn mt-3">
              <button className="btn btn-danger" onClick={hendleuser}>Sing Up</button>
            </div>
            <p className='mt-4 text-center'>Do you have <Link className=" text-warning" to="/login">Sing In hear</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ragister