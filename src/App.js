import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Transactions from './pages/Transactions/Transactions'
import Categories from './pages/Categories/Categories'
import Budgets from './pages/Budgets/Budgets'
import Files from './pages/FileUploads/Files'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/budgets' element={<Budgets />} />
          <Route path='/uploads' element={<Files />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
