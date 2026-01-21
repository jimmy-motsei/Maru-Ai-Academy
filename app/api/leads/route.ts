import { NextRequest, NextResponse } from 'next/server';

// Lead data interface (previously from chatbot types)
interface LeadData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  interest?: string;
  message?: string;
  sourceUrl?: string;
  conversationTranscript?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const leadData: LeadData = body;

    // Validate required fields
    if (!leadData.name || !leadData.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send lead data via email (for now - can be extended to database/CRM later)
    const emailSent = await sendLeadEmail(leadData);

    if (!emailSent) {
      throw new Error('Failed to send lead notification');
    }

    return NextResponse.json({
      success: true,
      message: 'Lead information received successfully'
    });
  } catch (error) {
    console.error('Leads API error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to process lead data'
      },
      { status: 500 }
    );
  }
}

/**
 * Send lead notification email
 * For production, this should use a proper email service (SendGrid, Resend, etc.)
 */
async function sendLeadEmail(leadData: LeadData): Promise<boolean> {
  try {
    // Format the email content
    const emailContent = `
New Lead from Maru AI Academy Chatbot
=====================================

Name: ${leadData.name}
Email: ${leadData.email}
Company: ${leadData.company || 'Not provided'}
Phone: ${leadData.phone || 'Not provided'}
Interest: ${leadData.interest || 'Not specified'}
Message: ${leadData.message || 'None'}

Source URL: ${leadData.sourceUrl || 'Unknown'}
Timestamp: ${new Date().toISOString()}

--- Conversation Transcript ---
${leadData.conversationTranscript || 'No transcript available'}
=====================================
    `.trim();

    // For development/testing: Log sanitized version
    console.log('=================================');
    console.log('NEW ACADEMY LEAD CAPTURED');
    console.log('Name: [REDACTED]');
    console.log('Email: [REDACTED]');
    console.log('Company:', leadData.company || 'Not provided');
    console.log('Interest:', leadData.interest || 'Not specified');
    console.log('Timestamp:', new Date().toISOString());
    console.log('=================================');

    // TODO: Implement actual email sending with Resend or similar
    // For now, return true (development mode)
    return true;
  } catch (error) {
    console.error('Error sending lead email:', error);
    return false;
  }
}
