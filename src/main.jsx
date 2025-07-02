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

/*
import User from './pages/User-info/User.jsx';
import Bookshelf from './pages/User-info/Bookshelf.jsx';
import Friends from './pages/User-info/Friends.jsx';
import Manage from './pages/User-info/ManageGroup.jsx';
import EditProfile from './pages/User-info/EditProf.jsx';
*/



const router = createBrowserRouter([
  {path: '/',element: <App />,
  children: [
  {path: '', element:<Homepage/>},
  {path: 'group', element:<Group/>},
  {path: 'discover', element: <Discover/>},
  {path: 'info', element:<Information/>},
  {path: 'create', element:<CreateGroup/>},
  {path: '/user', element:<User/>},


/*
  {
    path: 'user',
    element: <User />,
    children:[
      { index: true, element: <Bookshelf /> },
      { path: 'bookshelf', element: <Bookshelf /> },
      { path: 'friends', element: <Friends /> },
      { path: 'manageGroup', element: <ManageGroup /> },
      { path: 'editProf', element: <EditProf/> },
       */
  
  ],
  },
  {path: '/create', element:<CreateGroup/>},
  {path: '/user', element:<User/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
