
import React from 'react'
import "./style.css"
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const navigate = useNavigate()

    const logout = () => {

        const day = new Date()
        const days = day.toLocaleDateString()
        const time = day.toLocaleTimeString()
        const id = localStorage.getItem("id")

        axios.get('http://localhost:8000/users/get').then((res) => {
            const items = res.data.result.filter(item => {
                if (item._id === id) {
                    return item
                }
            })
            let activetime = items[0].userActive.filter(item => {
                if (item.date === days) {
                    const prevtime = item.times;
                    // item.times.push(...prevtime, time);
                    console.log(item.times);
                    return item.times
                }
            })
            console.log(activetime);
            const prev = activetime?.[0]?.times;
            const newtime = activetime[0].times = [...prev, time];

             activetime = items[0]?.userActive?.filter(item => {
                if (item.date === days) {
                   item.times = newtime
                }
                return activetime
            })

            console.log(activetime);
            axios.patch(`http://localhost:8000/users/update/${id}`, {
                userActive: activetime
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log('patch method is faild');
            })

        }).catch((err) => {

        })

    }

    return (
        <>
            <div className="row w-100 px-5 mx-auto align-items-center bg-dark" style={{ height: "80px" }}>
                <div className="col-6 d-flex align-items-center  justify-content-between gap-5">
                    <h1 className='text-light'>to<span className='text-primary'>do</span></h1>
                    {/* <div className="toggle-bar">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div> */}
                    <button className='btn btn-sm text-light btn-warning' onClick={logout}>logout</button>
                </div>
                <div className="col-6 d-flex align-items-center gap-2">
                    <div className="box ms-auto rounded-5 profile" style={{ height: "50px", width: "50px", }}>

                    </div>
                    <h5 className='text-light'>{localStorage.getItem("name")}</h5>
                </div>
            </div>
        </>
    )
}

export default Header