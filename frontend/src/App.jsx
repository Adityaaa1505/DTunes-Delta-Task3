import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import { Provider } from "react-redux"
import store from './States/store'
import { AppProvider } from './States/Context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Search from './Components/Search/Search'

const App = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/search' element={<Search/>} />
          </Routes>
        </Router>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"/>
      </AppProvider>
    </Provider>
  )
}

export default App