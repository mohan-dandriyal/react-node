
import React, { Fragment, useEffect } from 'react'
import Ragister from './user/Ragister'
import Login from './user/Login'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Wraper from './layout/Wraper';
import { ToastContainer } from 'react-toastify';
import ForwordPassword from './user/ForgetPassword'
// import Error from './error/Error';


function App() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // checking while component is being mounted weather it is auth check or not
        if (location.pathname === "" || location.pathname === "/") {
            navigate("/login");
        }
    }, []);

    const user = () => {
        return (
            <>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/ragister' element={<Ragister />} />
                    <Route path='/forgetpass' element= {<ForwordPassword />} />
                    {/* <Route path='/*' element= {<Error />} /> */}
                </Routes>
            </>
        )
    }

    return (
        <Fragment>
            <ToastContainer />
        {
            location.pathname === "" ||
            location.pathname === "/" ||
            location.pathname === "/forgetpass"||
            // location.pathname === "*" ||
            location.pathname === "/login" ||
            location.pathname === "/ragister" 
              ?(
            user()) : 
        <Wraper />
        } 
    </Fragment>
    )


}

export default App