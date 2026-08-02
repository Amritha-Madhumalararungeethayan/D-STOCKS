import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Forgot(){
    const navigate = useNavigate();
    const [email , setEmail]  = useState('');
    const [errormessage , setError] = useState('');
    
    const handleLogin = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/forgot-password",{
        method :"POST",
        headers :{"Content-Type": "application/json"},
            credentials : "include",
            body :JSON.stringify({email})
    });
    const data = await response.json();
     if(!response.ok){
        setError(data.message)
    }
    else{
    setError('');
    console.log(data);
    navigate('/allvideos');}
};


return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-8 ">
    <h1 className="text-9xl text-center text-red-600 " >  D-STOCKS</h1>    
    <p className="text-2xl text-center text-red-50">Welcome Back ! </p>
    <div className="flex flex-col gap-4  "></div>
    <form onSubmit={handleLogin}
        className="mt-8 w-full max-w-md rounded-2xl bg-slate-800 p-8 shadow-2xl space-y-5">
        <input
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Email"
        className="w-full rounded-lg border border-gray-600 bg-slate-700 px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
        />
        {errormessage  && <p style={{color:"red"}}>{errormessage}</p>}
         <button type="submit" className="mx-auto block rounded-full bg-red-600 hover:bg-red-700 text-white px-30 py-3">Forgot password</button>
    </form>
    </div>
    );


}

export default Forgot; 