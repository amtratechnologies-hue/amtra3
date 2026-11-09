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
  light: '#F0F4FA',
  text: '#172A45',
  muted: '#5B6B82',
  border: '#DCE5F0',
};

export const ADMIN_NOTIFICATION_SUBJECT =
  'New Service Request Received \u2014 AMTRA Technologies';

/**
 * Minimal administrator notification. The full request is intentionally not
 * included; the administrator reads it from the authenticated admin panel.
 */
export function buildAdminNotificationEmail({
  request,
  submittedAt,
  receiverEmail,
}) {
  const clientName = safeHeaderValue(request.fullName, 'A client');
  const service = safeHeaderValue(request.service, 'a service');
  const submitted = formatSubmittedAt(submittedAt);

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(ADMIN_NOTIFICATION_SUBJECT)}</title>
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
                <h1 style="margin:10px 0 0;font-size:23px;line-height:1.3;color:#ffffff;">
                  New Service Request Received
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:30px 32px;">
                <p style="margin:0 0 18px;font-size:15px;line-height:1.75;">
                  A new client service request has been submitted through the AMTRA Technologies website.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};width:170px;vertical-align:top;font-size:13px;font-weight:600;color:${COLORS.muted};">
                      Client name
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};vertical-align:top;font-size:14px;color:${COLORS.text};">
                      ${escapeHtml(displayValue(clientName))}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};vertical-align:top;font-size:13px;font-weight:600;color:${COLORS.muted};">
                      Requested service
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};vertical-align:top;font-size:14px;color:${COLORS.text};">
                      ${escapeHtml(displayValue(service))}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};vertical-align:top;font-size:13px;font-weight:600;color:${COLORS.muted};">
                      Submitted
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};vertical-align:top;font-size:14px;color:${COLORS.text};">
                      ${escapeHtml(submitted)}
                    </td>
                  </tr>
                </table>

                <p style="margin:22px 0 0;font-size:14px;line-height:1.75;">
                  The complete request is available in the secure admin panel.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px;background:${COLORS.navySoft};">
                <p style="margin:0;font-size:12px;line-height:1.7;color:#C7D3E4;">
                  AMTRA Technologies Website Inquiry System
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
    'NEW SERVICE REQUEST RECEIVED',
    '',
    'A new client service request has been submitted through the AMTRA Technologies website.',
    '',
    `Client name: ${displayValue(clientName)}`,
    `Requested service: ${displayValue(service)}`,
    `Submitted: ${submitted}`,
    '',
    'The complete request is available in the secure admin panel.',
  ].join('\n');

  return {
    to: receiverEmail,
    subject: ADMIN_NOTIFICATION_SUBJECT,
    html,
    text,
  };
}
