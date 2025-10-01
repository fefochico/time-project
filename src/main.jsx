import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Activities from './pages/Activities.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const router= createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <Login/>
      },
      {
        path: "login", 
        element: <Login/>
      },
      {
        path: "home",
        element: <PrivateRoute><Home/></PrivateRoute>,
        children: [
          {
            index: true,
            element: <PrivateRoute><Activities/></PrivateRoute>
          },
          {
          path: "projects",
          element: <PrivateRoute><Projects/></PrivateRoute>
          }
        ]
      },

    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
