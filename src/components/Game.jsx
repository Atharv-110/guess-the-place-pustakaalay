import { useState, useEffect } from "react";
// import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Game Timer Component
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// import Questions/Answer Data
import Questions from "../json/questions.json";

const Game = () => {
  // Declarations & Definitions
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [optionBtn, setOptionBtn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [nextBtn, setNextBtn] = useState(true);
  const [playing, setPlaying] = useState(true);

  // Fetching data from json file and setting it at every time the game screen loads
  useEffect(() => {
    setQuestions(Questions);
  }, []);

  // Below useEffect shuffles the options everytime screen loads i.e. at question change
  useEffect(() => {
    if (questions.length > 0) {
      shuffleOptions();
    }
  }, [currentQuestionIndex, questions]);

  // Below useEffect sets the progress in progress bar everytime screen loads i.e. at question change
  useEffect(() => {
    if (questions.length > 0) {
      const currentProgress =
        ((currentQuestionIndex + 1) / questions.length) * 100;
      setProgress(currentProgress);
    }
  }, [currentQuestionIndex, questions]);

  // Below Function Shuffle the Options
  const shuffleOptions = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const options = [...currentQuestion.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
  };

  // Below Function Handles all the Option Clicks (Contains Main Logic of Quiz Game)
  const handleOptionClick = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    setSelectedOption(option);
    setOptionBtn(true);
    setCorrectOption(currentQuestion.correctAnswer);
    if (currentQuestionIndex + 1 < questions.length) {
      if (option === currentQuestion.correctAnswer) {
        // Correct answer logic
        setPlaying(false);
        Swal.fire({
          allowOutsideClick: false,
          icon: "success",
          title: "Right",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          setPlaying(true);
        });
        setCorrectOption(option);
      } else {
        // Incorrect answer logic
        setPlaying(false);
        Swal.fire({
          allowOutsideClick: false,
          icon: "error",
          title: "Wrong",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          setPlaying(true);
        });
      }
    } else {
      setPlaying(false);
      Swal.fire({
        // icon: "error",
        allowOutsideClick: false,
        title: "Game Completed",
        text: "Redirecting to Summary...",
        timer: 2500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/summary");
      });
    }
    setNextBtn(false);
  };

  const handleNextQuestion = () => {
    setNextBtn(true);
    setOptionBtn(false);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game over logic
      setPlaying(false);
      // alert("Game over!");
    }
  };

  // Below Function Deals after the timer is complete
  const timerComplete = () => {
    // navigate("/summary")
    Swal.fire({
      allowOutsideClick: false,
      title: "Time's Up!",
      iconHtml:
        '<i class="fa-solid fa-hourglass-end fa-shake" style="color: #000000;"></i>',
      showCancelButton: false,
      showConfirmButton: false,
      text: "Redirecting to summary page...",
      timer: 2000,
    }).then(() => {
      navigate("/summary");
    });
  };

  // Below function handles the Pause Click
  const handlePause = () => {
    setPlaying(false);
    Swal.fire({
      allowOutsideClick: false,
      title: "Game Paused!",
      iconHtml: '<i class="fa-solid fa-pause" style="color: #000000;"></i>',
      showDenyButton: true,
      confirmButtonText: "Resume",
      denyButtonText: `Quit`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setPlaying(true);
      } else if (result.isDenied) {
      }
    });
  };

  if (questions.length === 0) {
    return <></>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="game">
      {/* Game Navbar Starts */}
      <div className="game-nav">
        <button onClick={() => handlePause()} className="pause-btn">
          <i className="fa-solid fa-pause"></i>
        </button>
        <h1 className="game-title">Guess the place</h1>
        <div className="game-timer">
          <CountdownCircleTimer
            strokeLinecap={"round"}
            size={50}
            strokeWidth={0}
            // isPlaying={playing}
            isPlaying={false}
            duration={60}
            trailColor="#502F1A"
            colors="#E8852A"
            onComplete={() => timerComplete()}
          >
            {({ remainingTime }) => (
              <h1 className="game-timer-count">{remainingTime}</h1>
            )}
          </CountdownCircleTimer>
        </div>
      </div>
      {/* Game Navbar Ends */}

      {/* Game Progress Bar Starts */}
      {/* <div className="game-progress">
        <div className="progress-bar">
          <div
            className="progress-level"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-count">
          <p>
            <span>{currentQuestionIndex + 1}</span>/{questions.length}
          </p>
        </div>
      </div> */}
      {/* Game Progress Bar Ends */}

      {/* Game Main Starts */}
      <div className="game-main">
        <div className="game-question">
          <img src={currentQuestion.question} alt="question_image" />
        </div>
        <div className="game-option">
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              disabled={optionBtn}
              onClick={() => handleOptionClick(option)}
              className={
                selectedOption === option
                  ? option === currentQuestion.correctAnswer
                    ? "correct-option-btn"
                    : "wrong-option-btn"
                  : option === correctOption
                  ? "correct-option-btn"
                  : "game-option-btn"
              }
            >
              {option}
            </button>
          ))}
        </div>
        <div className="gradient-btn">
          <button className="instruction-btn">New Game</button>
          <button
            disabled={nextBtn}
            className={nextBtn ? "instruction-btn-blr" : "instruction-btn"}
            onClick={() => handleNextQuestion()}
          >
            Next Question
          </button>
        </div>
      </div>
      {/* Game Main Ends */}
    </div>
  );
};

export default Game;
