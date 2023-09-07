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
import HomeScreen from './screens/private/HomeScreen'
import ContactsScreen from './screens/private/ContactsScreen'
import ProfileScreen from './screens/private/ProfileScreen'
import ThirdPartiesScreen from './screens/private/ThirdPartiesScreen'
import ThirdPartyScreen from './screens/private/ThirdPartyScreen'
import ContactDetailsScreen from './screens/private/ContactDetailsScreen'
import ProductsScreen from './screens/private/ProductsScreen'
import ProductDetailsScreen from './screens/private/ProductDetailsScreen'
import CollectesScreen from './screens/private/CollectesScreen'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LoginScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/produits" element={<ProductsScreen />} />
        <Route path="/produit/:id" element={<ProductDetailsScreen />} />
        <Route path="/contacts" element={<ContactsScreen />} />
        <Route path="/contact/:id" element={<ContactDetailsScreen />} />
        <Route path="/tiers" element={<ThirdPartiesScreen />} />
        <Route path="/tier/:id" element={<ThirdPartyScreen />} />
        <Route path="/profile" element={<ProfileScreen />}></Route>
        <Route path="/collectes" element={<CollectesScreen />}></Route>
      </Route>
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
