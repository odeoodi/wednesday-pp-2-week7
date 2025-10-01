import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {useState} from 'react'

// pages & components
import Home from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage"
import ProductPage from './pages/ProductPage'
import EditProductPage from "./pages/EditProductPage";
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(()=> {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? true : false // if is user and token, 
                                            // return true, otherwise false
  })

    return (
      <div className="App">
        <BrowserRouter>
          <Navbar isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}/>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-product" element={isAuthenticated ? <AddProductPage /> : <Navigate to='/signup' />} />
              <Route path="/products/:id" element={<ProductPage  isAuthenticated={isAuthenticated}/> }/>
              <Route path="/edit-product/:id" element={isAuthenticated ? <EditProductPage /> : <Navigate to='/signup' />} />
              <Route path="/signup" element={isAuthenticated ? 
              ( <Navigate to="/" /> ) :
              ( <SignupPage setIsAuthenticated={setIsAuthenticated}/>)}
              />
             <Route path="/login"element={isAuthenticated ? 
              ( <Navigate to="/" /> ) :
              ( <LoginPage setIsAuthenticated={setIsAuthenticated}/>)}
              />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
