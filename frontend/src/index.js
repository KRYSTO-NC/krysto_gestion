import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './assets/styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginScreen from './screens/LoginScreen'
import PrivateRoute from './components/shared/PrivateRoute'
import AdminRoute from './components/shared/AdminRoute'
// import './assets/styles/bootstrap.custom.css'
import App from './App'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LoginScreen />} />
      <Route path="" element={<PrivateRoute />}></Route>
      <Route path="" element={<AdminRoute />}></Route>
    </Route>,
  ),
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)
