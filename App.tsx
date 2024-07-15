import { useState, ChangeEvent } from 'react';
import GeetestCaptcha from './captcha';
import './App.css';

export default function App() {
  const [inputGtValue, setInputGtValue] = useState('');
  const [gtValue, setGtValue] = useState<string | null>(null);

  const [inputChallengeValue, setInputChallengeValue] = useState('');
  const [challengeValue, setChallengeValue] = useState<string | null>(null);

  const handleInputGtChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputGtValue(event.target.value);
  };
  const handleInputChallengeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputChallengeValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (!inputGtValue || !inputChallengeValue) {
      alert('请输入内容！');
      return;
    }
    setGtValue(inputGtValue);
    setChallengeValue(inputChallengeValue);
  };

  return (
    <div className="App">
      <h1>Welcome to Geetest Demo</h1>
      <div>
        <label htmlFor="inputField">gt：</label>
          <input
            type="text"
            value={inputGtValue}
            onChange={handleInputGtChange}
            placeholder="请输入gt值"
          />
      </div>
      <div>
        <label htmlFor="inputField">challenge：</label>
          <input
            type="text"
            value={inputChallengeValue}
            onChange={handleInputChallengeChange}
            placeholder="请输入challenge值"
          />
      </div>
      <button onClick={handleButtonClick}>生成验证码</button>
      {gtValue && challengeValue && <GeetestCaptcha gt={gtValue} challenge={challengeValue} />}
    </div>
  );
}
