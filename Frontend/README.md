# Shree Ganesh Collections - Premium Mithai Hampers & Handcrafted Jewelry

A luxury e-commerce website built with Next.js, featuring premium mithai hampers and handcrafted jewelry collections.

## Features

- **Premium Mithai Hampers**: Traditional Indian sweets collections
- **Handcrafted Jewelry**: Elegant bracelets, necklaces, earrings, and accessories
- **Custom Builder**: Personalized hamper and jewelry creation tool
- **Gift Cards**: Digital gift card system with email delivery
- **Contact Forms**: Professional inquiry handling with email notifications
- **Newsletter**: Subscription system with welcome emails
- **Responsive Design**: Mobile-first approach with beautiful animations

## Tech Stack

- **Frontend**: Next.js 13, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Email**: Nodemailer with responsive HTML templates
- **UI Components**: Radix UI, Lucide React icons
- **Forms**: React Hook Form with validation
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Gmail account for SMTP (or other email service)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.local` and configure your email settings:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   COMPANY_NAME=Your Company Name
   ADMIN_EMAIL=admin@yourcompany.com
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `SMTP_PASS`

### Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

## Project Structure

```
Frontend/
├── app/
│   ├── api/email/          # API routes for email handling
│   ├── hampers/            # Hamper category pages
│   ├── jewelry/            # Jewelry category pages
│   ├── contact/            # Contact page
│   ├── custom-builder/     # Custom builder tool
│   └── gift-cards/         # Gift card system
├── components/
│   ├── home/               # Homepage components
│   ├── layout/             # Header and Footer
│   └── ui/                 # Reusable UI components
└── lib/
    ├── email-server.ts     # Server-side email utilities
    └── utils.ts            # Utility functions
```

## API Endpoints

- `POST /api/email/contact` - Contact form submissions
- `POST /api/email/custom-builder` - Custom builder quote requests
- `POST /api/email/newsletter` - Newsletter subscriptions
- `POST /api/email/gift-card` - Gift card purchases

## Environment Variables

### Required
- `SMTP_USER` - Email address for sending emails
- `SMTP_PASS` - Email password or app password
- `ADMIN_EMAIL` - Admin email for notifications

### Optional
- `SMTP_HOST` - SMTP server (default: smtp.gmail.com)
- `SMTP_PORT` - SMTP port (default: 587)
- `COMPANY_NAME` - Company name for branding
- `COMPANY_EMAIL` - Company contact email
- `COMPANY_PHONE` - Company phone number

## Features Overview

### Email System
- Dual email sending (admin notifications + customer confirmations)
- Responsive HTML templates with luxury design
- Support for custom messages and attachments
- Error handling and logging

### Custom Builder
- Interactive product selection
- Real-time price calculation
- Customization options (packaging, delivery, messages)
- Quote request system

### Gift Cards
- Digital gift card generation
- Unique code creation
- Multi-recipient email system
- Scheduled delivery options

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary and confidential.