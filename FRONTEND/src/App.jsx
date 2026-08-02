
import './App.css' 
import Login from './Login.jsx'
import Home from './home.jsx'
import Register from './Register.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Forgot from './Forgot.jsx'
import Resetpwd from './reset.jsx'
import Logout from './Logout.jsx'
import createChart from "./Charts.jsx"
import Feed from "./Feed.jsx"
function App() {
  return(
    <div className="min-h-screen bg-black-600">
    <BrowserRouter>
    <Routes>
    <Route path ="/" element={<Home/>}/>
    <Route path ="/forgot-password" element={<Forgot/>}/>
    <Route path ="/login" element={<Login/>}/>
    <Route path ="/register" element={<Register/>}/>
    <Route path ="/reset-password/:token" element={<Resetpwd/>}/>
    <Route path="/logout" element={<Logout/>}/>
    <Route path="/charts" element={<createchart/>}/>
    <Route path="/feed" element={<Feed/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  
    
    )
}
export default App