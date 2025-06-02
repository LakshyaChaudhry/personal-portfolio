
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  let body = req.body;
  if (!body) {
    
    let raw = '';
    for await (const chunk of req) raw += chunk;
    body = JSON.parse(raw || '{}');
  }

  const { name, email, subject = 'No subject', message } = body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',   
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New Message: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });
    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}
