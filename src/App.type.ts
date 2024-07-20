type GeetestValidateResult = {
  geetest_challenge: string;
  geetest_seccode: string;
  geetest_validate: string;
};
  
export type GeetestError = {
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
  
export interface GeetestCaptchaObj {
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
  
export type InitGeetestCallback = (captchaObj: GeetestCaptchaObj) => void;
