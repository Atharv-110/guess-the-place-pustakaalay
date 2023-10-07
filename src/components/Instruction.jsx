import { useNavigate } from "react-router-dom";

// images import
// import instructionHeading from "../assets/how-to-play.png";
// import startBtn from "../assets/start.svg";
import bullet from "../assets/bullet.svg";

export default function Instruction() {
  const navigate = useNavigate();
  return (
    <div className="instruction">
      <div className="instruction-box">
        <h1 className="instruction-heading">How To Play</h1>
        <div className="instruction-text">
          <div className="instruction-text-item">
            <img src={bullet} alt="" />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
              repudiandae est sed non omnis ducimus.
            </p>
          </div>
          <div className="instruction-text-item">
            <img src={bullet} alt="" />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
              repudiandae est sed non omnis ducimus.
            </p>
          </div>
          <div className="instruction-text-item">
            <img src={bullet} alt="" />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
              repudiandae est sed non omnis ducimus.
            </p>
          </div>
        </div>

        <button onClick={() => navigate("/level")} className="instruction-btn">
          Start
        </button>
      </div>
    </div>
  );
}