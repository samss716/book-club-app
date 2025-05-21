import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateGroup from './pages/CreateGroup.jsx'
import User from './pages/User.jsx';
import Homepage from './pages/Homepage.jsx';
import Group from './pages/Group.jsx';
import Information from './pages/Information.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Discover from './pages/Discover.jsx'


const router = createBrowserRouter([
  {path: '/',element: <App />,
  children: [
  {path: '', element:<Homepage/>},
  {path: 'group', element:<Group/>},
  {path: 'discover', element: <Discover/>},
  {path: 'info', element:<Information/>},
  {path: 'create', element:<CreateGroup/>},
  { path: '/user', element:<User/>}
  ],
  },
  { path: '/create', element:<CreateGroup/>},
  { path: '/user', element:<User/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
