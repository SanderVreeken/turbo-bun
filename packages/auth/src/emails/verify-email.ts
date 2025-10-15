export function VerifyEmail(userName: string | undefined, verificationUrl: string): string {
  return `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="color: #333; text-align: center;">Verify Your Email Address</h2>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        Hi ${userName || 'there'},
      </p>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        Thanks for signing up! Please click the button below to verify your email address and complete your registration.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" 
           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
          Verify Email Address
        </a>
      </div>
      <p style="color: #999; font-size: 14px; line-height: 1.5;">
        If the button doesn't work, you can copy and paste this link into your browser:
      </p>
      <p style="color: #007bff; font-size: 14px; word-break: break-all;">
        ${verificationUrl}
      </p>
      <p style="color: #999; font-size: 12px; margin-top: 40px;">
        If you didn't create an account, you can safely ignore this email.
      </p>
    </div>
  `;
}