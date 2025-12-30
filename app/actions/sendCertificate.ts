'use server'

import { renderToBuffer } from '@react-pdf/renderer'
import { Resend } from 'resend'
import { CertificateData } from '@/components/pdf/CertificatePDF'
import React from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface SendCertificateResult {
  success: boolean
  message: string
  certificateId?: string
}

/**
 * Generate a unique certificate ID
 */
function generateCertificateId(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 8)
  return `MARU-${timestamp}-${randomPart}`.toUpperCase()
}

/**
 * Format date for certificate display
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Create certificate PDF document
 */
async function createCertificatePDF(data: CertificateData): Promise<Buffer> {
  // Dynamic import to avoid SSR issues
  const { CertificatePDF } = await import('@/components/pdf/CertificatePDF')
  const doc = React.createElement(CertificatePDF, { data })
  return await renderToBuffer(doc as any)
}

/**
 * Send a course completion certificate via email
 */
export async function sendCertificate(
  recipientEmail: string,
  recipientName: string,
  courseName: string,
  stream: 'Beginner' | 'Intermediate',
  modulesCompleted: number,
  totalModules: number,
  totalHours?: number
): Promise<SendCertificateResult> {
  try {
    // Validate input
    if (!recipientEmail || !recipientName || !courseName) {
      return {
        success: false,
        message: 'Missing required fields: email, name, or course name',
      }
    }

    // Check for Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not configured - certificate generation skipped')
      return {
        success: false,
        message: 'Email service not configured. Please contact support.',
      }
    }

    // Generate certificate data
    const certificateId = generateCertificateId()
    const completionDate = formatDate(new Date())

    const certificateData: CertificateData = {
      recipientName,
      courseName,
      stream,
      modulesCompleted,
      totalModules,
      completionDate,
      certificateId,
      totalHours,
    }

    // Generate PDF buffer
    const pdfBuffer = await createCertificatePDF(certificateData)

    // Convert to base64 for email attachment
    const pdfBase64 = pdfBuffer.toString('base64')

    // Send email with certificate
    const { error } = await resend.emails.send({
      from: 'Maru AI Academy <certificates@maruonline.com>',
      to: recipientEmail,
      subject: `🎓 Congratulations! Your ${stream} Stream Certificate`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3DD6D0, #1a365d); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">🎉 Congratulations!</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <p style="font-size: 18px; color: #333;">Dear ${recipientName},</p>
            
            <p style="color: #555; line-height: 1.6;">
              Congratulations on completing the <strong>${courseName}</strong> in the 
              <strong>${stream} Stream</strong>!
            </p>
            
            <div style="background: white; border-left: 4px solid #3DD6D0; padding: 20px; margin: 20px 0;">
              <h3 style="color: #1a365d; margin-top: 0;">Your Achievement</h3>
              <ul style="color: #555;">
                <li>Completed ${modulesCompleted} of ${totalModules} modules</li>
                ${totalHours ? `<li>Invested ${totalHours}+ hours of learning</li>` : ''}
                <li>Certificate ID: <strong>${certificateId}</strong></li>
              </ul>
            </div>
            
            <p style="color: #555; line-height: 1.6;">
              Your certificate is attached to this email. You can also verify it anytime at:
              <br>
              <a href="https://academy.maruonline.com/verify/${certificateId}" style="color: #3DD6D0;">
                academy.maruonline.com/verify/${certificateId}
              </a>
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://academy.maruonline.com/dashboard" 
                 style="background: #3DD6D0; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Continue Learning
              </a>
            </div>
            
            <p style="color: #888; font-size: 14px;">
              Share your achievement on LinkedIn and tag @MaruOnline!
            </p>
          </div>
          
          <div style="background: #1a365d; padding: 20px; text-align: center;">
            <p style="color: #white; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} Maru AI Academy. All rights reserved.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Maru-Certificate-${stream}-${certificateId}.pdf`,
          content: pdfBase64,
        },
      ],
    })

    if (error) {
      console.error('Failed to send certificate email:', error)
      return {
        success: false,
        message: 'Failed to send certificate email. Please try again.',
      }
    }

    console.log(`Certificate ${certificateId} sent to ${recipientEmail}`)

    return {
      success: true,
      message: 'Certificate sent successfully! Check your email.',
      certificateId,
    }
  } catch (error) {
    console.error('Certificate generation error:', error)
    return {
      success: false,
      message: 'An error occurred while generating your certificate.',
    }
  }
}

/**
 * Check if a user has completed a stream
 */
export async function checkStreamCompletion(
  userId: string,
  stream: 'beginner' | 'intermediate'
): Promise<{ completed: boolean; modulesCompleted: number; totalModules: number }> {
  // This would typically check the database for lesson progress
  // For now, return a placeholder
  const totalModules = stream === 'beginner' ? 4 : 4

  // TODO: Query database for actual completion status
  // const completedModules = await prisma.lessonProgress.findMany(...)

  return {
    completed: false,
    modulesCompleted: 0,
    totalModules,
  }
}
