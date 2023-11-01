
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
    userEmail: 'rahul@gmail.com',
    userPass: 'mohan@10'
  })

  const day = new Date()
  const time = day.toLocaleTimeString()

  const hendleLogin = () => {
    const day = new Date()
    const date = 2 //day.getDate();
    const month = day.getMonth() + 1;
    const year = 2024
    const time = day.toLocaleTimeString()


    axios.post("http://localhost:8000/users/login/", user).then((res) => {
      const id = res.data.user._id;
      let userActive = res.data.user.userActive;

      console.log(userActive);
      let active = userActive.map(items => {
        console.log(items);

        let yea = items.year;
        let mon = items.year[1].month;
        let dates = items.year[1].month[1].date

        if (items.year[0] === year) {
          if (mon[0] === month) {
            if (dates[0] === date) {
              console.log('da', date);
              dates[1].logintime.push(time);
              console.log(items);
            } else {
              console.log('dat', date);
              mon.push({ date: [date, { logintime: [time], logoutTime: [null] }] })
            }
          }
          else {
            yea.push({ month: [month, { date: [date, { logintime: [time], logoutTime: [null] }] }] })
          }
        } 
        return items
      })


      let years = userActive[0]?.year[0]

      active?.length > 0 ? userActive = active : userActive.push({
        year: [year, {
          month: [month, {
            date: [date, {
              logintime: [time],
              logoutTime: [null]
            }]
          }]
        }]
      });

      axios.patch(`http://localhost:8000/users/update/${id}`, {
        userActive: userActive
      }).then((res) => {
        console.log(res);
        // navigate("/todo")
        localStorage.setItem("id", id)
        console.log(res);
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