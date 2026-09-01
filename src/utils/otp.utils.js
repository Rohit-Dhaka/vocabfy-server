export function getOtp(){
    return Math.floor(100000 + Math.random() * 900000).toString()
}
export function getHtmlEmailVerify(otp, name) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email - Vocabfy</title>
      </head>

      <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden;">

          <div style="padding: 30px; text-align: center; background-color: #111827;">
            <h1 style="margin: 0; color: #ffffff;">Vocabfy</h1>
          </div>

          <div style="padding: 40px 30px;">
            <h2 style="margin-top: 0; color: #111827;">
              Verify your email
            </h2>

            <p style="color: #4b5563; font-size: 16px;">
              Hi ${name},
            </p>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Thanks for creating your Vocabfy account. Use the OTP below
              to verify your email address.
            </p>

            <div style="margin: 30px 0; text-align: center;">
              <div style="display: inline-block; padding: 15px 30px; background-color: #f3f4f6; border-radius: 8px;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111827;">
                  ${otp}
                </span>
              </div>
            </div>

            <p style="color: #6b7280; font-size: 14px;">
              This OTP is valid for 10 minutes.
            </p>

            <p style="color: #6b7280; font-size: 14px;">
              If you did not create a Vocabfy account, you can safely ignore
              this email.
            </p>
          </div>

          <div style="padding: 20px 30px; background-color: #f9fafb; text-align: center;">
            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
              © Vocabfy. All rights reserved.
            </p>
          </div>

        </div>
      </body>
    </html>
  `;
}


export function getHtmlForgetPasword(otp, name) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset Your Password - Vocabfy</title>
      </head>

      <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden;">

          <div style="padding: 30px; text-align: center; background-color: #111827;">
            <h1 style="margin: 0; color: #ffffff;">Vocabfy</h1>
          </div>

          <div style="padding: 40px 30px;">
            <h2 style="margin-top: 0; color: #111827;">
              Reset your password
            </h2>

            <p style="color: #4b5563; font-size: 16px;">
              Hi ${name},
            </p>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              We received a request to reset your Vocabfy account password.
              Use the OTP below to continue.
            </p>

            <div style="margin: 30px 0; text-align: center;">
              <div style="display: inline-block; padding: 15px 30px; background-color: #f3f4f6; border-radius: 8px;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111827;">
                  ${otp}
                </span>
              </div>
            </div>

            <p style="color: #6b7280; font-size: 14px;">
              This OTP is valid for 10 minutes.
            </p>

            <p style="color: #6b7280; font-size: 14px;">
              If you did not request a password reset, please ignore this
              email. Your password will remain unchanged.
            </p>
          </div>

          <div style="padding: 20px 30px; background-color: #f9fafb; text-align: center;">
            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
              © Vocabfy. All rights reserved.
            </p>
          </div>

        </div>
      </body>
    </html>
  `;
}