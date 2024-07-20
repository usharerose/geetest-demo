import { render, fireEvent, screen } from '@testing-library/react';

import App from './App';
import { GeetestCaptchaObj, InitGeetestCallback } from './App.type';

const mockCaptchaObj: GeetestCaptchaObj = {
  onSuccess: jest.fn(),
  onError: jest.fn(),
  onReady: jest.fn(),
  getValidate: () => ({
    geetest_challenge: 'mockChallenge',
    geetest_seccode: 'mockSeccode',
    geetest_validate: 'mockValidate'
  }),
  verify: jest.fn(),
  reset: jest.fn(),
  destroy: jest.fn(),
  appendTo: jest.fn(),
  onNextReady: jest.fn(),
  onFail: jest.fn(),
  onClose: jest.fn(),
  showCaptcha: jest.fn()
};

describe('App Component', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText(/Geetest Demo/i)).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<App />);

    const gtInput = screen.getByPlaceholderText('gt');
    const challengeInput = screen.getByPlaceholderText('challenge');

    fireEvent.change(gtInput, { target: { value: 'test_gt_value' } });
    fireEvent.change(challengeInput, { target: { value: 'test_challenge_value' } });

    expect(gtInput).toHaveValue('test_gt_value');
    expect(challengeInput).toHaveValue('test_challenge_value');
  });

  test('shows alert when form is submitted with empty fields', () => {
    render(<App />);
    window.alert = jest.fn();

    const form = screen.getByRole('form');

    fireEvent.submit(form);

    expect(window.alert).toHaveBeenCalledWith('Please fill the form first');
  });

  test('shows captcha area when form is submitted with filled fields', async () => {
    render(<App />);

    const gtInput = screen.getByPlaceholderText('gt');
    const challengeInput = screen.getByPlaceholderText('challenge');
    const form = screen.getByRole('form');

    (window as any).initGeetest = jest.fn((options: any, callback: InitGeetestCallback) => {
      callback(mockCaptchaObj);
    });

    fireEvent.change(gtInput, { target: { value: 'test_gt_value' } });
    fireEvent.change(challengeInput, { target: { value: 'test_challenge_value' } });

    fireEvent.submit(form);

    expect(mockCaptchaObj.onReady).toHaveBeenCalled();
  });
});
