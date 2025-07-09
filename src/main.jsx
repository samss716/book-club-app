import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';

import CreateGroup from './pages/CreateGroup.jsx';
import User from './pages/User.jsx';
import Homepage from './pages/Homepage.jsx';
import Bookshelf from './pages/Bookshelf.jsx';
import Information from './pages/Information.jsx';
import Discover from './pages/Discover.jsx';

/*import Bookshelf from './pages/User-info/Bookshelf-trial.jsx';*/
import EditProf from './pages/User-info/EditProf.jsx';
import Friends from './pages/User-info/Friends.jsx';
import ManageGroup from './pages/User-info/ManageGroup.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {path: '/',element: <App />,
  children: [
  {path: '', element:<Homepage/>},
  {path: 'bookshelf', element:<Bookshelf/>},
  {path: 'discover', element: <Discover/>},
  {path: 'info', element:<Information/>},
  {path: 'create', element:<CreateGroup/>},
  {path: 'user', element: <User /> },

 /* { path: 'bookshelf', element: <Bookshelf /> },*/
  { path: 'friends', element: <Friends /> },
  { path: 'manage', element: <ManageGroup /> },
  { path: 'edit', element: <EditProf /> }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
