import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div>Reso-Reserve</div>
      <div className="RegButton">
        <button onClick={()=>{navigate('/register')}}>Register new admin</button>
      </div>
    </div>
  );
};

export default NavBar;
