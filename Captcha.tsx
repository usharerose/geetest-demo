import React, { useEffect } from 'react';

interface GeetestProps {
  gt: string;
  challenge: string;
}

const GeetestCaptcha: React.FC<GeetestProps> = ({ gt, challenge }) => {
  useEffect(() => {
    const handler = (captchaObj: any) => {
      captchaObj.appendTo('#captchaBox');
      captchaObj.onSuccess(() => {
        const result = captchaObj.getValidate();
        console.log(`Geetest captcha validate successfully: validate: ${result.geetest_validate}, seccode: ${result.geetest_seccode}`);
      });
    };

    (window as any).initGeetest({
      gt,
      challenge,
      offline: false,
      new_captcha: true,
      product: 'float', // product type. including float, popup
      width: '300px',
      https: true
    }, handler);
  }, [gt, challenge]);

  return (
    <div id="captchaBox"></div>
  );
}

export default GeetestCaptcha;
