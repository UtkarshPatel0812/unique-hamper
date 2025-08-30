import { NextRequest, NextResponse } from 'next/server';
import { sendDualEmails } from '@/lib/email-server';

const COMPANY_NAME = process.env.COMPANY_NAME || "Shree Ganesh Collections";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const customerContent = `
      <div class="content-title">💌 Hi ${data.name}, we received your message!</div>
      <div class="content-text">Thank you for reaching out to us. Below are the details of your inquiry:</div>
      
      <div class="field-container">
        <div class="field-row">
          <div class="field-label">Subject</div>
          <div class="field-value">${data.subject}</div>
        </div>
        <div class="field-row">
          <div class="field-label">Your Message</div>
          <div class="field-value">${data.message}</div>
        </div>
        ${data.phone ? `
        <div class="field-row">
          <div class="field-label">Phone Number</div>
          <div class="field-value">${data.phone}</div>
        </div>
        ` : ''}
      </div>
      
      <div class="highlight-box">
        <div class="highlight-title">We'll be in touch soon!</div>
        <div class="highlight-text">
          Our team will review your message and respond within 24 hours. For urgent matters, 
          feel free to <a href="mailto:${process.env.COMPANY_EMAIL}">contact us directly</a>.
        </div>
      </div>
`;

    const adminContent = `
      <div class="content-title">📬 New Contact Submission</div>
      <div class="content-text">A new customer inquiry has been received. Please review and respond promptly.</div>
      
      <div class="field-container">
        <div class="field-row">
          <div class="field-label">Customer Name</div>
          <div class="field-value">${data.name}</div>
        </div>
        <div class="field-row">
          <div class="field-label">Email Address</div>
          <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
        </div>
        ${data.phone ? `
        <div class="field-row">
          <div class="field-label">Phone Number</div>
          <div class="field-value"><a href="tel:${data.phone.replace(/\D/g, '')}">${data.phone}</a></div>
        </div>
        ` : ''}
        <div class="field-row">
          <div class="field-label">Subject</div>
          <div class="field-value">${data.subject}</div>
        </div>
        <div class="field-row">
          <div class="field-label">Message</div>
          <div class="field-value">${data.message}</div>
        </div>
        ${data.productInterest ? `
        <div class="field-row">
          <div class="field-label">Product Interest</div>
          <div class="field-value">${data.productInterest}</div>
        </div>
        ` : ''}
      </div>
      
      <div class="highlight-box">
        <div class="highlight-title">⏰ Action Required</div>
        <div class="highlight-text">
          Please respond to this customer inquiry within 24 hours to maintain our excellent service standards.
        </div>
      </div>
`;

    const result = await sendDualEmails(
      data.email,
      `New Contact Submission - ${COMPANY_NAME}`,
      adminContent,
      `Thanks for Reaching Out - ${COMPANY_NAME}`,
      customerContent
    );

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Contact form emails sent successfully",
      });
    } else {
      throw new Error("Failed to send emails");
    }
  } catch (error: any) {
    console.error("Error sending contact form emails:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send contact form emails",
        error: error.message,
      },
      { status: 500 }
    );
  }
}