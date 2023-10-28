import React from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Todo from '../pages/Todo'
import Error from "./Error"
import "./style.css";

function PrivateRoute() {
  return (
    <>
      <div class="row m-0 bg-dark" >
        <div className="col-md-12 col-lg-12 midwher" >
        <Routes>
            <Route path='/todo' element={<Todo />} />
            <Route path="*" element= {<Error />} />
        </Routes> 
        </div>
      </div>
   </>
    )
}

export default PrivateRoute