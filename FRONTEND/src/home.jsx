import { Link } from "react-router-dom"
import Logout from "./Logout"

function Home(){
    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-8 ">
        <h1 className="text-9xl text-center text-red-600 " >  D-STOCKS</h1>
        <p className="text-2xl text-center text-red-50">Meme x Stocks </p>
        <div className="flex flex-col gap-4  ">
        <Link to="/login" className="rounded-full bg-red-600 text-white px-22 py-4">Login</Link>
        <Link to="/register" className="rounded-full bg-red-600 text-white px-20 py-5">Register</Link></div>
        <Link to="/forgot-password" className="text-blue-600">Forgot Password</Link>
        
        </div>
        
    )
}

export default Home 