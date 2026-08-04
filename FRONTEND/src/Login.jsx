import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errormessage, setError] = useState('');
    const glogin = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) {
            setError(data.message);
        } else {
            setError('');
            navigate('/feed');
        }
    };
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center gap-5">
            <h1 className="text-7xl font-bold text-red-500 tracking-wider">
                D-STOCKS
            </h1>
            <p className="text-2xl text-white">
                Welcome Back !
            </p>
            <div className="w-full max-w-md flex flex-col gap-4">
                <form
                    onSubmit={handleLogin}
                    className="bg-slate-800 p-8 rounded-2xl shadow-2xl flex flex-col gap-5"
                >
                    <input
                        type="text"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Email"
                        className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-red-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Password"
                        className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-red-500"
                    />
                    {errormessage && (
                        <p className="text-red-400 text-center">
                            {errormessage}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-full transition"
                    >
                        Login
                    </button>
                </form>
                <button
                    onClick={glogin}
                    className="bg-white text-black hover:bg-gray-200 py-3 rounded-full transition"
                >
                    Login with Google
                </button>
            </div>
        </div>
    );
}
export default Login;