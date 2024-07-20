import React, { ChangeEvent, useState } from 'react';
import { FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa6';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import './App.css';
import { GeetestCaptchaObj, GeetestError, InitGeetestCallback } from './App.type';
import GithubIcon from './assets/github-mark.svg';

export default function App() {
  const [inputGtValue, setInputGtValue] = useState('');

  const [inputChallengeValue, setInputChallengeValue] = useState('');
  const [showChallengeValue, setShowChallengeValue] = useState(false);

  const [showCaptchaModal, setShowCaptchaModal] = useState(false);

  const [geetestValidate, setGeetestValidate] = useState<string | null>(null);
  const [geetestSeccode, setGeetestSeccode] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);

  const handleInputGtChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputGtValue(event.target.value);
  };
  const handleInputChallengeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputChallengeValue(event.target.value);
  };

  const handleFormSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputGtValue || !inputChallengeValue) {
      alert('Please fill the form first');
      return;
    }
    setShowCaptchaModal(true);

    const handler: InitGeetestCallback = (captchaObj: GeetestCaptchaObj) => {
      captchaObj.onSuccess(() => {
        const result = captchaObj.getValidate();
        setGeetestValidate(result.geetest_validate);
        setGeetestSeccode(result.geetest_seccode);
      });
      captchaObj.onReady(() => {
        captchaObj.verify();
      });
      captchaObj.onError((error: GeetestError) => {
        console.log(`onError: ${JSON.stringify(error)}`);
        // raise error_100 when call verify() first time
        // with message: '传给appendTo接口的参数有误：只接受id选择器和DOM元素，并且需保证其存在于页面中'
        if (error.code !== 'error_100') {
          alert(`${error.msg}`);
        }
      });
    };

    (window as any).initGeetest({
      gt: inputGtValue,
      challenge: inputChallengeValue,
      offline: false,
      new_captcha: true,
      product: 'bind',
      https: true,
      area: '#captcha-area'
    }, handler);
  };

  const result = `const validate: string = '${geetestValidate}';\nconst seccode: string = '${geetestSeccode}';`;

  return (
    <div className="login-main">
      <div className="login-left">
        {geetestValidate && geetestSeccode ? (
          <div className="code-snippet-container">
            <div className="code-snippet-header">
              <span className="language-hint">Typescript</span>
              <CopyToClipboard text={result} onCopy={() => setCopied(true)}>
                <button className="copy-button">
                  <FaCopy />
                  {copied ? ' Copied!' : ' Copy code'}
                </button>
              </CopyToClipboard>
            </div>
            <SyntaxHighlighter className="geetest-result" language="typescript">
              {result}
            </SyntaxHighlighter>
          </div>
        ) : (
          <h1>Geetest Demo</h1>
        )}
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <h2>usharerose</h2>
          </div>
          <div className="login-center">
            <h2>Welcome to debug with Geetest Captcha</h2>
            <p>Please enter your <strong>gt</strong> and <strong>challenge</strong> from server</p>
            <form aria-label="login-form" onSubmit={handleFormSubmmit}>
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
                  type={showChallengeValue ? 'text' : 'password'}
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
            </form>
          </div>
          <p className="login-bottom-p">
            Credits: Style follows the project 「<a href="https://github.com/Kuzma02/Login-Page-In-React" target="_blank">Login-Page-In-React <img src={GithubIcon} style={{ width: '1em', height: '1em' }} alt="" /></a>」
          </p>
        </div>
      </div>
      {showCaptchaModal && <div className="#captcha-area"></div>}
    </div>
  );
}
