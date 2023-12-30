import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import SignUp from './pages/Login/SignUp'
import Transactions from './pages/Transactions/Transactions'
import Categories from './pages/Categories/Categories'
import Budgets from './pages/Budgets/Budgets'
import GoalForm from './pages/Goals/GoalForm'
import Files from './pages/FileUploads/Files'
import NotFound from './pages/NotFound'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/budgets' element={<Budgets />} />
          <Route path='/uploads' element={<Files />} />
          <Route path='/goals' element={<GoalForm />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
