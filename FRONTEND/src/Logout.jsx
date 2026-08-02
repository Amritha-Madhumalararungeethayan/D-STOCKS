import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout(){
    const navigate = useNavigate();
    const handleLogout = async() =>{
        try{
            const res = await axios.post("http://localhost:5000/api/auth/logout",{},
            { withCredentials : true ,}

            );
            alert(res.data.message);
            navigate("/login")
        
    } catch(err){
        console.log(err);
        alert("Logout failed");

    }
};
return <button onClick={handleLogout}>Logout</button>
}

export default Logout