import { useNavigate } from "react-router-dom";

// import images
import starImg from "../assets/stars.png";
import restartImg from "../assets/restart.png";
import goImg from "../assets/go.png";

export default function Summary() {
  const navigate = useNavigate();
  return (
    <div className="summary">
      <div className="summary-box">
        <h1 className="summary-heading">Hurray!</h1>
        {/* <img className="summary-heading" src={summaryHeading} alt="heading" /> */}
        <img className="summary-star" src={starImg} alt="heading" />
        <p className="summary-level">Level 1</p>
        <div className="summary-score-box">
          <h3>300</h3>
        </div>
        <h4 className="summary-score-subtitle">NEW BEST SCORE</h4>
        <div className="summary-btn">
          <button onClick={() => navigate("/level")} className="summary-btn-restart">
            <img src={restartImg} alt="" />
          </button>
          <button onClick={() => navigate("/")} className="summary-btn-home">
            <img src={goImg} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}