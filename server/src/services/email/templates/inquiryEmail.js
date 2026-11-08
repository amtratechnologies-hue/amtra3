import {
  displayValue,
  escapeHtml,
  formatSubmittedAt,
  safeHeaderValue,
} from './format.js';

const COLORS = {
  navy: '#101827',
  navySoft: '#172A45',
  accent: '#3985D6',
  secondary: '#7957D5',
  light: '#F0F4FA',
  text: '#172A45',
  muted: '#5B6B82',
  border: '#DCE5F0',
};

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};width:190px;vertical-align:top;font-size:13px;font-weight:600;color:${COLORS.muted};">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};vertical-align:top;font-size:14px;color:${COLORS.text};">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

export function buildInquiryEmail({ inquiry, submittedAt }) {
  const submitted = formatSubmittedAt(submittedAt);
  const fullName = safeHeaderValue(inquiry.fullName, 'Website visitor');
  const service = safeHeaderValue(inquiry.service, 'Project inquiry');
  const subject = `New Project Inquiry \u2013 ${service} \u2013 ${fullName}`;

  const description = String(inquiry.description ?? '').trim();

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
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid ${COLORS.border};border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:${COLORS.navy};padding:28px 32px;">
                <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${COLORS.accent};font-weight:700;">
                  AMTRA Technologies
                </p>
                <h1 style="margin:10px 0 0;font-size:24px;line-height:1.3;color:#ffffff;">
                  New Client Project Inquiry
                </h1>
                <p style="margin:10px 0 0;font-size:13px;line-height:1.6;color:#C7D3E4;">
                  A new project inquiry has been submitted through the official AMTRA Technologies website.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px 8px;">
                <h2 style="margin:0 0 6px;font-size:13px;letter-spacing:1.6px;text-transform:uppercase;color:${COLORS.accent};">
                  Client Information
                </h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row('Full Name', inquiry.fullName)}
                  ${row('Business Email', inquiry.email)}
                  ${row('Phone / WhatsApp', displayValue(inquiry.phone))}
                  ${row('Company Name', displayValue(inquiry.company))}
                  ${row('Country', displayValue(inquiry.country))}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 8px;">
                <h2 style="margin:0 0 6px;font-size:13px;letter-spacing:1.6px;text-transform:uppercase;color:${COLORS.secondary};">
                  Project Information
                </h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row('Service Required', inquiry.service)}
                  ${row('Project Budget', displayValue(inquiry.budget))}
                  ${row('Expected Timeline', displayValue(inquiry.timeline))}
                  ${row('Preferred Contact Method', displayValue(inquiry.contactMethod))}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 8px;">
                <h2 style="margin:0 0 10px;font-size:13px;letter-spacing:1.6px;text-transform:uppercase;color:${COLORS.secondary};">
                  Project Description
                </h2>
                <div style="padding:16px 18px;background:${COLORS.light};border-left:3px solid ${COLORS.accent};border-radius:6px;font-size:14px;line-height:1.75;color:${COLORS.text};white-space:pre-wrap;">${escapeHtml(description)}</div>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 28px;">
                <h2 style="margin:0 0 6px;font-size:13px;letter-spacing:1.6px;text-transform:uppercase;color:${COLORS.muted};">
                  Submission Information
                </h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row('Submission Date', submitted)}
                  ${row('Source', 'AMTRA Technologies Official Website')}
                </table>
                <p style="margin:20px 0 0;font-size:14px;line-height:1.7;color:${COLORS.text};">
                  Please review this inquiry and contact the client using the details provided.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px;background:${COLORS.navySoft};">
                <p style="margin:0;font-size:12px;line-height:1.7;color:#C7D3E4;">
                  Regards,<br />
                  AMTRA Technologies Website Inquiry System<br />
                  <span style="color:${COLORS.accent};">amtratechnologies@gmail.com</span>
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
    'AMTRA TECHNOLOGIES',
    'NEW CLIENT PROJECT INQUIRY',
    '',
    'A new project inquiry has been submitted through the official AMTRA Technologies website.',
    '',
    'CLIENT INFORMATION',
    `Full Name: ${displayValue(inquiry.fullName)}`,
    `Business Email: ${displayValue(inquiry.email)}`,
    `Phone / WhatsApp: ${displayValue(inquiry.phone)}`,
    `Company Name: ${displayValue(inquiry.company)}`,
    `Country: ${displayValue(inquiry.country)}`,
    '',
    'PROJECT INFORMATION',
    `Service Required: ${displayValue(inquiry.service)}`,
    `Project Budget: ${displayValue(inquiry.budget)}`,
    `Expected Timeline: ${displayValue(inquiry.timeline)}`,
    `Preferred Contact Method: ${displayValue(inquiry.contactMethod)}`,
    '',
    'PROJECT DESCRIPTION',
    displayValue(description),
    '',
    'SUBMISSION INFORMATION',
    `Submission Date: ${submitted}`,
    'Source: AMTRA Technologies Official Website',
    '',
    'Please review this inquiry and contact the client.',
    '',
    'Regards,',
    'AMTRA Technologies Website Inquiry System',
    'amtratechnologies@gmail.com',
  ].join('\n');

  return {
    to: inquiry.receiverEmail,
    subject,
    html,
    text,
  };
}
