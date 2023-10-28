
import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import SaideBar from './SaideBar'
import "./style.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate()
  const [user, setUesr] = useState({
    userEmail: null,
    userPass: null
  })

  const day = new Date()
  const time = day.toLocaleTimeString()

  const hendleLogin = () => {
    const day = new Date()
    const days = day.toLocaleDateString()
    const time = day.toLocaleTimeString()


    axios.post("http://localhost:8000/users/login/", user).then((res) => {
      const id = res.data.user._id;
      let userActive = res.data.user.userActive;
      let active = userActive.filter(items => {
        if (items?.date === days) {
          return items
        }
      })
      const prevtime = active.length > 0 && active[0]?.times
      const dates = active.length > 0 && active[0]?.date

      dates === days ? userActive = [{ date: days, times: [...prevtime, time] }] : userActive.push({ date: days, times: [time] });
      
      axios.patch(`http://localhost:8000/users/update/${id}`, {
        userActive: userActive
      }).then((res) => {
        navigate("/todo")
        localStorage.setItem("id", id)
      }).catch((err) => {
        console.log('patch method is faild');
      })
    }).catch((err) => {
      console.log(err);
    })
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
              <h3 style={{ color: '#c2c3c5' }}>Sing In</h3>
            </div>

            <div className="input-box mb-4">
              <div className="form-label">
                <label htmlFor="UserName :">Email Id</label>
              </div>
              <div className="form-input">
                <input type="Email" className='form-control w-100' onChange={(e) => setUesr((prev) => ({ ...prev, userEmail: e.target.value }))} />
              </div>
            </div>

            <div className="input-box my-3 ">
              <div className="form-label">
                <label htmlFor="UserName :">Password</label>
              </div>
              <div className="form-input">
                <input type="Password" className='form-control w-100' onChange={(e) => setUesr((prev) => ({ ...prev, userPass: e.target.value }))} />
              </div>
            </div>

            <div className="submit-btn mt-5">
              <Link to="/forgetpass">Forword Password</Link>
            </div>

            <div className="submit-btn mt-5">
              <button className="btn btn-danger" onClick={hendleLogin}>Sing in</button>
            </div>
            <p className='mt-4 text-center'>Do you have <Link className=" text-warning" to="/ragister">Sing up hear</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login