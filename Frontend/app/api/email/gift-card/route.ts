import { NextRequest, NextResponse } from 'next/server';
import { sendDualEmails } from '@/lib/email-server';

const COMPANY_NAME = process.env.COMPANY_NAME || "Shree Ganesh Collections";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shreeganeshcollections.com";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const giftCardCode = "LC" + Math.random().toString(36).substr(2, 9).toUpperCase();

    const adminEmailTemplate = `
      <div class="content-title">🎁 New Gift Card Purchase</div>
      <div class="content-text">A new digital gift card has been purchased and needs to be processed.</div>
      
      <div class="highlight-box">
        <div class="highlight-title">Gift Card Code: ${giftCardCode}</div>
        <div class="highlight-text">Please activate this code in the system immediately</div>
      </div>
      
      <div class="field-container">
        <div class="field-row">
          <div class="field-label">Sender Name</div>
          <div class="field-value">${data.senderName}</div>
        </div>
        <div class="field-row">
          <div class="field-label">Sender Email</div>
          <div class="field-value"><a href="mailto:${data.senderEmail}">${data.senderEmail}</a></div>
        </div>
        <div class="field-row">
          <div class="field-label">Recipient Name</div>
          <div class="field-value">${data.recipientName}</div>
        </div>
        <div class="field-row">
          <div class="field-label">Recipient Email</div>
          <div class="field-value"><a href="mailto:${data.recipientEmail}">${data.recipientEmail}</a></div>
        </div>
        <div class="field-row">
          <div class="field-label">Amount</div>
          <div class="field-value">₹${data.amount}</div>
        </div>
        <div class="field-row">
          <div class="field-label">Delivery Date</div>
          <div class="field-value">${data.deliveryDate || "Immediate"}</div>
        </div>
        ${data.message ? `
        <div class="field-row">
          <div class="field-label">Personal Message</div>
          <div class="field-value">"${data.message}"</div>
        </div>
        ` : ''}
      </div>
    `;

    const recipientEmailTemplate = `
      <div class="content-title">🎉 You've Received a Gift Card!</div>
      <div class="content-text">Dear ${data.recipientName},</div>
      <div class="content-text">
        ${data.senderName} has sent you a beautiful gift card to ${COMPANY_NAME}. 
        Get ready to discover our exquisite collection of premium hampers and handcrafted jewelry!
      </div>
      
      <div class="highlight-box" style="background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%); color: white; text-align: center;">
        <div style="font-size: 20px; font-weight: 700; margin-bottom: 10px;">🎁 DIGITAL GIFT CARD</div>
        <div style="font-size: 32px; font-weight: 700; margin: 15px 0;">₹${data.amount}</div>
        <div style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; font-size: 18px; font-weight: 700; letter-spacing: 2px; margin: 15px 0;">
          ${giftCardCode}
        </div>
        <div style="font-size: 14px; opacity: 0.9;">Never Expires • Valid for All Collections</div>
      </div>
      
      ${data.message ? `
      <div class="field-container">
        <div class="field-label">Personal Message from ${data.senderName}</div>
        <div class="field-value" style="font-style: italic;">"${data.message}"</div>
      </div>
      ` : ''}
      
      <div class="field-container">
        <div class="field-label" style="margin-bottom: 15px; font-size: 16px;">How to Use Your Gift Card</div>
        <div class="steps-container">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-title">Browse Collections</div>
            <div class="step-description">Visit our website and explore our premium collections</div>
          </div>
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-title">Add to Cart</div>
            <div class="step-description">Select your favorite hampers or jewelry pieces</div>
          </div>
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-title">Apply Code</div>
            <div class="step-description">Enter code <strong>${giftCardCode}</strong> at checkout</div>
          </div>
          <div class="step-item">
            <div class="step-number">4</div>
            <div class="step-title">Enjoy</div>
            <div class="step-description">Receive your luxury items with premium packaging</div>
          </div>
        </div>
      </div>
      
      <div style="text-align: center;">
        <a href="${SITE_URL}" class="btn-primary">Start Shopping Now</a>
      </div>
      
      <div class="field-container">
        <div class="field-label" style="margin-bottom: 15px; font-size: 16px;">Discover Our Collections</div>
        <div class="content-text">
          • <strong>🍫 Premium Hampers:</strong> Artisan chocolates and gourmet treats<br>
          • <strong>💎 Handcrafted Jewelry:</strong> Elegant pieces for every occasion<br>
          • <strong>💍 Engagement Collections:</strong> Perfect for life's special moments<br>
          • <strong>🎨 Custom Creations:</strong> Personalized designs made just for you
        </div>
      </div>
    `;

    const senderEmailTemplate = `
      <div class="content-title">✅ Gift Card Sent Successfully!</div>
      <div class="content-text">Dear ${data.senderName},</div>
      
      <div class="highlight-box">
        <div class="highlight-title">Your Gift Has Been Delivered!</div>
        <div class="highlight-text">
          Your digital gift card has been successfully sent to ${data.recipientName} at ${data.recipientEmail}. 
          They'll receive it ${data.deliveryDate ? `on ${data.deliveryDate}` : "immediately"}.
        </div>
      </div>
      
      <div class="field-container">
        <div class="field-label" style="margin-bottom: 15px; font-size: 16px;">Gift Card Details</div>
        <div class="field-row">
          <div class="field-label">Recipient</div>
          <div class="field-value">${data.recipientName}</div>
        </div>
        <div class="field-row">
          <div class="field-label">Amount</div>
          <div class="field-value">₹${data.amount}</div>
        </div>
        <div class="field-row">
          <div class="field-label">Gift Card Code</div>
          <div class="field-value" style="font-weight: 700; color: #D4AF37;">${giftCardCode}</div>
        </div>
        <div class="field-row">
          <div class="field-label">Delivery</div>
          <div class="field-value">${data.deliveryDate || "Immediate"}</div>
        </div>
        ${data.message ? `
        <div class="field-row">
          <div class="field-label">Your Message</div>
          <div class="field-value">"${data.message}"</div>
        </div>
        ` : ''}
      </div>
      
      <div class="field-container">
        <div class="field-label" style="margin-bottom: 15px; font-size: 16px;">What Happens Next?</div>
        <div class="content-text">
          ${data.recipientName} will receive a beautifully designed email with their gift card and 
          complete instructions. The gift card never expires and can be used for any item in our collection.
        </div>
      </div>
      
      <div style="text-align: center;">
        <a href="${SITE_URL}/gift-cards" class="btn-primary">Send Another Gift Card</a>
      </div>
    `;

    // Send to admin
    const adminResult = await sendDualEmails(
      process.env.ADMIN_EMAIL || "admin@shreeganeshcollections.com",
      `New Gift Card Purchase - ${COMPANY_NAME}`,
      adminEmailTemplate,
      `New Gift Card Purchase - ${COMPANY_NAME}`,
      adminEmailTemplate
    );

    // Send to recipient
    const recipientResult = await sendDualEmails(
      data.recipientEmail,
      `🎁 You've Received a Gift Card - ${COMPANY_NAME}`,
      recipientEmailTemplate,
      `🎁 You've Received a Gift Card - ${COMPANY_NAME}`,
      recipientEmailTemplate
    );

    // Send to sender
    const senderResult = await sendDualEmails(
      data.senderEmail,
      `✅ Your Gift Has Been Sent - ${COMPANY_NAME}`,
      senderEmailTemplate,
      `✅ Your Gift Has Been Sent - ${COMPANY_NAME}`,
      senderEmailTemplate
    );

    const result = {
      success: adminResult.success && recipientResult.success && senderResult.success
    };

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Gift card emails sent successfully",
        giftCardCode,
      });
    } else {
      throw new Error("Failed to send one or more emails");
    }
  } catch (error: any) {
    console.error("Gift Card Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send gift card emails",
        error: error.message,
      },
      { status: 500 }
    );
  }
}