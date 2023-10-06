import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="menu">
      <div className="menu-heading">
        <h1>Guess the Place</h1>
      </div>
      <button onClick={() => navigate("/instruction")} className="menu-btn">
        <i className="fa-solid fa-play"></i>
      </button>
    </div>
  );
};

export default Menu;
