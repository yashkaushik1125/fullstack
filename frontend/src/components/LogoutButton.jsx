import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
export default function LogoutButton({setUser}) {
  
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/v1/users/logout", {
      method: "POST",
      credentials: "include"
    }).then((e)=>e.json()).then((e)=>alert(e.message)).then(setUser({}))

    navigate("/login"); 
  };

  return <button onClick={handleLogout}>Logout</button>;
}
