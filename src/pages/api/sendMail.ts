import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { escapeHtml } from '@utils/postTools';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  SMTP_TO,
} = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !SMTP_TO) {
  console.warn('[sendMail] SMTP env vars are not fully set');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    // Basic validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create SMTP transport
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465, false otherwise
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Pumpushka Blog" <${SMTP_FROM}>`,
      to: SMTP_TO,
      replyTo: email,
      subject: `Message from — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
      envelope: {
        from: SMTP_FROM,
        to: SMTP_TO,
      },
    };

    // IMPORTANT: await sendMail on Vercel :contentReference[oaicite:1]{index=1}
    await transporter.sendMail(mailOptions);

    // For plain form submit: redirect to thank you page
    return new Response(JSON.stringify({ ok: true, status: 'Success' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[sendMail] error sending email', err);
    return new Response(JSON.stringify({ ok: false, error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
