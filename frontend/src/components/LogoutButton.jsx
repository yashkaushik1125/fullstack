import { useNavigate } from "react-router-dom";
import {ClipLoader} from 'react-spinners'
export default function LogoutButton({setUser}) {
  
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.LOGOUT_USER}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include"
    }).then((e)=>e.json()).then((e)=>alert(e.message)).then(setUser({}))

    navigate("/login"); 
  };

  return <button onClick={handleLogout}>Logout</button>;
}
