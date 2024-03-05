import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx';
import AdminApp from "./AdminApp.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AdminLogin from "./screens/Admin/AdminLogin.jsx";
import AdminDashboard from "./screens/Admin/AdminDashboard.jsx";
import EditUser from "./screens/Admin/EditUser.jsx";
import AddUser from "./screens/Admin/AddUser.jsx";
import AdminPrivateRoute from './components/Admin/AdminPrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route index={true} path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />

        {/* Private Routes */}
        <Route path='' element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfileScreen />} />
        </Route>
      </Route>

      <Route path="/admin" element={<AdminApp/>}>
        <Route index={true} path="/admin" element={<AdminLogin />} />
        <Route path="" element={<AdminPrivateRoute/>}>
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/admin/edituser" element={<EditUser/>} />
          <Route path="/admin/adduser" element={<AddUser/>} />
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
