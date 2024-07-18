import React, { ChangeEvent, useState } from 'react';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import './App.css';

type GeetestValidateResult = {
  geetest_challenge: string;
  geetest_seccode: string;
  geetest_validate: string;
};

type GeetestError = {
  code: string;
  error_code: string;
  msg: string;
  user_info: string;
};

type OnReadyFn = () => void;
type OnNextReadyFn = () => void;
type OnSuccessFn = (result: GeetestValidateResult | undefined) => void;
type OnFailFn = (error: GeetestError) => void;
type OnErrorFn = (error: GeetestError) => void;
type OnCloseFn = () => void;

interface GeetestCaptchaObj {
  appendTo: (element: HTMLElement | string) => void;
  onReady: (callback: OnReadyFn) => void;
  onNextReady: (callback: OnNextReadyFn) => void;
  onSuccess: (callback: OnSuccessFn) => void;
  onFail: (callback: OnFailFn) => void;
  onError: (callback: OnErrorFn) => void;
  onClose: (callback: OnCloseFn) => void;
  getValidate: () => GeetestValidateResult;
  reset: () => void;
  showCaptcha: () => void;
  destroy: () => void;
  verify: () => void;
}

export default function App() {
  const [inputGtValue, setInputGtValue] = useState('');

  const [inputChallengeValue, setInputChallengeValue] = useState('');
  const [showChallengeValue, setShowChallengeValue] = useState(false);

  const [showCaptchaModal, setShowCaptchaModal] = useState(false);

  const [geetestValidate, setGeetestValidate] = useState<string | null>(null);
  const [geetestSeccode, setGeetestSeccode] = useState<string | null>(null);

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

    const handler = (captchaObj: GeetestCaptchaObj) => {
      captchaObj.onSuccess(() => {
        const result = captchaObj.getValidate();
        setGeetestValidate(result.geetest_validate);
        setGeetestSeccode(result.geetest_seccode);
      })
      captchaObj.onReady(() => {
        captchaObj.verify();
      })
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
      area: '#captcha-area',
    }, handler);
  };

  const result = `const validate: string = '${geetestValidate}'\nconst seccode: string = '${geetestSeccode}'`;

  return (
    <div className="login-main">
      <div className="login-left">
        {geetestValidate && geetestSeccode ? (
          <SyntaxHighlighter className="geetest-result" language="javascript">
            {result}
          </SyntaxHighlighter>
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
            <form onSubmit={handleFormSubmmit}>
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
            </form>
          </div>
        </div>
      </div>
      {showCaptchaModal && <div className="#captcha-area"></div>}
    </div>
  );
}
