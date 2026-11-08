import { escapeHtml, safeHeaderValue } from './format.js';

const COLORS = {
  navy: '#101827',
  navySoft: '#172A45',
  accent: '#3985D6',
  secondary: '#7957D5',
  light: '#F0F4FA',
  text: '#172A45',
  border: '#DCE5F0',
};

export function buildConfirmationEmail({ inquiry, publicEmail }) {
  const clientName = safeHeaderValue(inquiry.fullName, 'there');
  const service = safeHeaderValue(inquiry.service, 'your project');
  const subject = 'Thank You for Contacting AMTRA Technologies';

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:${COLORS.light};font-family:Arial,Helvetica,sans-serif;color:${COLORS.text};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.light};padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${COLORS.border};border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:${COLORS.navy};padding:28px 32px;">
                <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${COLORS.accent};font-weight:700;">
                  AMTRA Technologies
                </p>
                <h1 style="margin:10px 0 0;font-size:24px;line-height:1.3;color:#ffffff;">
                  Thank you for contacting us
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:30px 32px;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.75;">
                  Dear ${escapeHtml(clientName)},
                </p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.75;">
                  Thank you for contacting AMTRA Technologies.
                </p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.75;">
                  We have successfully received your project inquiry regarding
                  <strong style="color:${COLORS.navy};">${escapeHtml(service)}</strong>.
                </p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.75;">
                  Our team will review your requirements and get back to you as soon as possible.
                </p>
                <p style="margin:0;font-size:15px;line-height:1.75;">
                  We appreciate your interest in working with AMTRA Technologies.
                </p>

                <div style="margin:26px 0 0;padding:18px;background:${COLORS.light};border-radius:8px;">
                  <p style="margin:0;font-size:13px;line-height:1.7;color:${COLORS.text};">
                    If you need to add anything to your inquiry, simply reply to this email or write to
                    <a href="mailto:${escapeHtml(publicEmail)}" style="color:${COLORS.accent};font-weight:600;">${escapeHtml(publicEmail)}</a>.
                  </p>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px;background:${COLORS.navySoft};">
                <p style="margin:0;font-size:12px;line-height:1.7;color:#C7D3E4;">
                  Best Regards,<br />
                  AMTRA Technologies<br />
                  <span style="color:${COLORS.accent};">${escapeHtml(publicEmail)}</span>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `Dear ${clientName},`,
    '',
    'Thank you for contacting AMTRA Technologies.',
    '',
    `We have successfully received your project inquiry regarding ${service}.`,
    '',
    'Our team will review your requirements and get back to you as soon as possible.',
    '',
    'We appreciate your interest in working with AMTRA Technologies.',
    '',
    'Best Regards,',
    'AMTRA Technologies',
    publicEmail,
  ].join('\n');

  return {
    to: inquiry.email,
    subject,
    html,
    text,
  };
}
