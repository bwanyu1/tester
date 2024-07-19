// src/Quiz.js
import React, { useState } from 'react';
import quizData from './quizData.json';
import './Quiz.css';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.id);
  };

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentQuestionIndex(0); // Go back to the first question
    }
    resetStateForNewQuestion();
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    } else {
      setCurrentQuestionIndex(quizData.length - 1); // Go to the last question
    }
    resetStateForNewQuestion();
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    resetStateForNewQuestion();
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const resetStateForNewQuestion = () => {
    setShowAnswer(false);
    setSelectedOption('');
    setUserAnswer('');
  };

  const renderQuestion = () => {
    if (currentQuestion.options) {
      return (
        <form onSubmit={handleSubmit}>
          <p>{currentQuestion.question}</p>
          {currentQuestion.options.map((option, index) => {
            const optionId = `option${index}`; // Generate unique option ID
            return (
              <div key={optionId}>
                <label>
                  <input
                    type="radio"
                    id={optionId}
                    name="quizOption"
                    value={option}
                    checked={selectedOption === optionId}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              </div>
            );
          })}
          <button type="submit" className="submit-button">回答を送信</button>
        </form>
      );
    } else {
      return (
        <form onSubmit={handleSubmit}>
          <p>{currentQuestion.question}</p>
          <textarea value={userAnswer} onChange={handleInputChange} />
          <button type="submit" className="submit-button">回答を送信</button>
        </form>
      );
    }
  };

  const checkAnswer = () => {
    if (currentQuestion.options) {
      const correctOption = currentQuestion.options.find(option => option.startsWith(currentQuestion.answer));
      if (correctOption) {
        const correctOptionId = currentQuestion.options.indexOf(correctOption);
        return selectedOption === `option${correctOptionId}`;
      }
    } else {
      if (userAnswer && userAnswer.trim() !== '') {
        return userAnswer.trim() === currentQuestion.answer.trim();
      }
    }
    return false;
  };

  return (
    <div className="quiz-container">
      <div className={`accordion ${isAccordionOpen ? 'open' : ''}`}>
        <button onClick={toggleAccordion} className="accordion-toggle">
          {isAccordionOpen ? '目次を閉じる' : '目次を開く'}
        </button>
        {isAccordionOpen && (
          <ul>
            {quizData.map((question, index) => (
              <li key={index}>
                <button onClick={() => handleJumpToQuestion(index)}>
                  問題 {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="quiz-content">
        {renderQuestion()}
        {showAnswer && (
          <div>
            <p>正解: {currentQuestion.answer}</p>
            <p>{checkAnswer() ? '正解です！' : '不正解です。'}</p>
          </div>
        )}
        <div className="navigation-buttons">
          <button onClick={handlePreviousQuestion} className="nav-button">もどる</button>
          <button onClick={handleNextQuestion} className="nav-button">次へ</button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
