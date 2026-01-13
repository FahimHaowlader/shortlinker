import { Navigate } from 'react-router'
import { createBrowserRouter,RouterProvider } from 'react-router'
import './App.css'


import PrivateRoute from './Components/PrivateRoute.jsx'

// Importing Pages
import HomePage from './Pages/HomePage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import DashboardPage from './Pages/Dashboard.jsx'
function App() {
  const router = createBrowserRouter([
    {
       path: '/',
       element: <Navigate to="/home" replace />
    },
    {
      path:'/home',
      Component: HomePage
    },
    {
      path:'/login',
      Component: LoginPage
    },
    {
      path:'/register',
      Component: RegisterPage
    },
    {
      path:'/dashboard',
      children: [
        {
          path:'/dashboard/:id',
          element: <PrivateRoute> <DashboardPage/></PrivateRoute>
        }
      ]
    }
    
    
    
    // {
    //         path: '*',
    //          Component: NotFoundPage
    // },
    
    
]) 
  
  return <RouterProvider router={router} />;
}


export default App
