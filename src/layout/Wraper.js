

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Todo from '../pages/Todo'
import PrivateRoute from '../error/PrivateRoute'
import Header from './Header'

function Wraper() {
  return (
    <>
        <PrivateRoute />
    </>
  )
}

export default Wraper