import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

/**
 * Send an email using Resend
 * @param options Email options
 * @returns Promise with email send result
 */
export async function sendEmail(options: EmailOptions) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️  RESEND_API_KEY not set - Email not sent');
      console.log('Would have sent email:', {
        to: options.to,
        subject: options.subject,
      });
      return { success: false, message: 'Email service not configured' };
    }

    const from = options.from || process.env.FROM_EMAIL || 'noreply@maruonline.com';

    const data = await resend.emails.send({
      from,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
    });

    console.log('✅ Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(to: string, name: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Maru AI Academy</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Maru AI Academy! 🎓</h1>
        </div>
        
        <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; margin-bottom: 20px;">Hi ${name || 'there'},</p>
          
          <p style="margin-bottom: 20px;">
            We're thrilled to have you join Maru AI Academy! You're about to embark on an exciting journey to master AI-powered productivity tools.
          </p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h2 style="margin-top: 0; color: #667eea; font-size: 20px;">🚀 Get Started:</h2>
            <ul style="margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 10px;">Explore our <strong>Beginner Stream</strong> (completely free!)</li>
              <li style="margin-bottom: 10px;">Learn AI fundamentals and prompt engineering</li>
              <li style="margin-bottom: 10px;">Build your first AI workflow</li>
              <li>Track your progress and earn certificates</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://academy.maruonline.com/modules" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
              Start Learning →
            </a>
          </div>
          
          <p style="margin-bottom: 20px;">
            Have questions? Our AI assistant is available 24/7 on the website, or you can reach out to our support team anytime.
          </p>
          
          <p style="margin-bottom: 5px;">Happy learning!</p>
          <p style="margin-top: 0; font-weight: 600;">The Maru AI Academy Team</p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 14px;">
          <p style="margin: 5px 0;">Maru AI Academy</p>
          <p style="margin: 5px 0;">
            <a href="https://academy.maruonline.com" style="color: #667eea; text-decoration: none;">academy.maruonline.com</a>
          </p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: 'Welcome to Maru AI Academy! 🎓',
    html,
  });
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
  type?: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1f2937; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">📧 New Contact Form Submission</h1>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                <a href="mailto:${data.email}" style="color: #667eea;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Type:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.type || 'General'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px;">
            <strong style="display: block; margin-bottom: 10px;">Message:</strong>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; white-space: pre-wrap;">
${data.message}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            Reply to: <a href="mailto:${data.email}" style="color: #667eea;">${data.email}</a>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL || 'hello@maruonline.com',
    subject: `New Contact Form: ${data.type || 'General'} - ${data.name}`,
    html,
  });
}

/**
 * Send support ticket confirmation to user
 */
export async function sendSupportTicketConfirmation(data: {
  email: string;
  subject: string;
  ticketId: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Support Ticket Received</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Support Ticket Received ✓</h1>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for contacting Maru AI Academy support. We've received your request and our team will get back to you within 24 hours.
          </p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Ticket ID:</strong> #${data.ticketId.substring(0, 8).toUpperCase()}</p>
            <p style="margin: 0;"><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
            Please reference this ticket ID in any follow-up communications.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 5px 0; font-weight: 600;">Maru AI Academy Support Team</p>
            <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">
              <a href="https://academy.maruonline.com/support" style="color: #667eea; text-decoration: none;">Visit Support Center</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: data.email,
    subject: `Support Ticket Received - Ticket #${data.ticketId.substring(0, 8).toUpperCase()}`,
    html,
  });
}

/**
 * Send password reset email with secure token link
 */
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL || 'https://academy.maruonline.com'}/auth/reset-password?token=${token}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Reset Your Password 🔐</h1>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            You recently requested to reset your password for your Maru AI Academy account. Click the button below to reset it.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
              Reset Password →
            </a>
          </div>
          
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              ⚠️ <strong>Security Notice:</strong> This link will expire in 1 hour. If you didn't request this password reset, please ignore this email.
            </p>
          </div>
          
          <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p style="word-break: break-all; color: #667eea; font-size: 13px;">
            ${resetUrl}
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 5px 0; font-weight: 600;">Maru AI Academy Team</p>
            <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">
              <a href="https://academy.maruonline.com" style="color: #667eea; text-decoration: none;">academy.maruonline.com</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'Reset Your Password - Maru AI Academy',
    html,
  });
}
