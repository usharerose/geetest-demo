import React, { useState, ChangeEvent } from 'react';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

import GeetestCaptcha from './captcha';
import './App.css';

export default function App() {
  const [inputGtValue, setInputGtValue] = useState('');
  const [gtValue, setGtValue] = useState<string | null>(null);

  const [inputChallengeValue, setInputChallengeValue] = useState('');
  const [challengeValue, setChallengeValue] = useState<string | null>(null);
  const [showChallengeValue, setShowChallengeValue] = useState(false);

  const handleInputGtChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputGtValue(event.target.value);
  };
  const handleInputChallengeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputChallengeValue(event.target.value);
  };

  const handleButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputGtValue || !inputChallengeValue) {
      alert('Please fill the form first');
      return;
    }
    setGtValue(inputGtValue);
    setChallengeValue(inputChallengeValue);
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <h1>Geetest Demo</h1>
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <h2>usharerose</h2>
          </div>
          <div className="login-center">
            <h2>Welcome to debug with Geetest Captcha</h2>
            <p>Please enter your <strong>gt</strong> and <strong>challenge</strong> from server</p>
            <form onSubmit={handleButtonClick}>
              <div className="pass-input-div">
                <input
                  type="text"
                  value={inputGtValue}
                  onChange={handleInputGtChange}
                  placeholder="gt"
                  name="gt"
                />
              </div>
              <div className="pass-input-div">
                <input
                  type={showChallengeValue ? "text" : "password"}
                  value={inputChallengeValue}
                  onChange={handleInputChallengeChange}
                  placeholder="challenge"
                  name="challenge"
                />
                {showChallengeValue ? (
                  <FaEye
                    onClick={() => {
                      setShowChallengeValue(!showChallengeValue);
                    }}
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => {
                      setShowChallengeValue(!showChallengeValue);
                    }}
                  />
                )}
              </div>
              <div className="login-center-buttons">
                <button type="submit">Generate captcha</button>
              </div>
              <div>
                {gtValue && challengeValue && <GeetestCaptcha gt={gtValue} challenge={challengeValue} />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
