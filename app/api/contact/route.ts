/**
 * ─── ASTRALEARNIA CONTACT EMAIL ROUTER ───────────────────────────────────────
 *
 * Runtime : Cloudflare Edge (no Node.js APIs)
 * Provider: Resend (https://resend.com) — HTTP-based, Edge-compatible
 *
 * ─── ENVIRONMENT VARIABLES (set in Cloudflare Pages → Settings → Variables) ──
 *
 *   RESEND_API_KEY          Your Resend API key  (re_xxxxxxxxxxxxxxxxxxxx)
 *
 *   CONTACT_FROM_NAME       Display name emails come FROM
 *                           e.g.  Astralearnia
 *
 *   CONTACT_FROM_EMAIL      The "from" address for outgoing emails.
 *                           ⚠️  Until your domain is verified in Resend,
 *                               use the sandbox address:
 *                               onboarding@resend.dev
 *                           After verifying astralearnia.com you can set this to
 *                               hello@astralearnia.com  (or any address on your domain)
 *
 *   CONTACT_TO_EMAILS       Comma-separated list of up to 50 recipient addresses
 *                           that receive the notification email.
 *                           Supports as many as you need — just separate with commas, no spaces.
 *                           e.g.  hello@astralearnia.com,sales@astralearnia.com,james@astralearnia.com
 *
 *                           You can add/change these at any time in Cloudflare without redeploying.
 *
 * ─── RESEND SETUP (one-time, 5 minutes) ──────────────────────────────────────
 *   1. Create a free account at https://resend.com
 *   2. Go to API Keys → Create API Key → give it a name → copy the key
 *   3. Paste it into Cloudflare as RESEND_API_KEY
 *   4. Free tier = 3,000 emails/month, 100/day — more than enough for a contact form
 *   5. After your domain is live, go to Resend → Domains → Add Domain → astralearnia.com
 *      and follow the DNS steps to verify it (just a few TXT records in Cloudflare DNS)
 */

export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
  phone?: string;
  division: "technology" | "institute" | "general";
  reason: string;
  budget?: string;
  teamSize?: string;
  message: string;
  source?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Send a single email via Resend's HTTP API.
 * Returns true on success, throws on failure.
 */
async function sendEmail({
  apiKey,
  from,
  to,
  replyTo,
  subject,
  html,
}: {
  apiKey: string;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<void> {
  const body: Record<string, unknown> = { from, to, subject, html };
  if (replyTo) body.reply_to = replyTo;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend error ${res.status}: ${detail}`);
  }
}

// ─── Email builders ───────────────────────────────────────────────────────────

function buildHtmlEmail(data: ContactPayload): string {
  const divisionColor =
    data.division === "technology"
      ? "#00c8ff"
      : data.division === "institute"
      ? "#a855f7"
      : "#00ffb2";

  const divisionLabel =
    data.division === "technology"
      ? "⚡ Technology Division"
      : data.division === "institute"
      ? "🎓 Institute Division"
      : "🌐 General Enquiry";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:#030508;font-family:'Segoe UI',Arial,sans-serif;color:#e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#030508;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0d1622;border-radius:16px;overflow:hidden;border:1px solid rgba(0,200,255,0.2);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#050d1a,#0a1428);padding:36px 40px;border-bottom:1px solid rgba(0,200,255,0.15);">
            <table width="100%"><tr>
              <td>
                <div style="font-size:22px;font-weight:900;letter-spacing:-0.04em;color:#fff;">ASTRALEARNIA</div>
                <div style="font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:rgba(0,200,255,0.7);margin-top:4px;">New Contact Submission</div>
              </td>
              <td align="right">
                <span style="display:inline-block;padding:6px 14px;border-radius:20px;border:1px solid ${divisionColor}50;background:${divisionColor}15;color:${divisionColor};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">
                  ${divisionLabel}
                </span>
              </td>
            </tr></table>
          </td>
        </tr>
        <!-- Body -->
        <tr><td style="padding:36px 40px;">
          <table width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td colspan="2" style="font-size:24px;font-weight:800;color:#fff;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.08);">
                ${data.firstName} ${data.lastName}
              </td>
            </tr>
          </table>
          <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px;">
            ${row("Email", `<a href="mailto:${data.email}" style="color:#00c8ff;">${data.email}</a>`)}
            ${data.organization ? row("Organisation", data.organization) : ""}
            ${data.phone ? row("Phone", data.phone) : ""}
            ${row("Reason", data.reason)}
            ${data.budget ? row("Budget Range", data.budget) : ""}
            ${data.teamSize ? row("Team Size", data.teamSize) : ""}
            ${data.source ? row("Submitted From", data.source) : ""}
          </table>
          <div style="margin-top:28px;padding:20px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:rgba(255,255,255,0.4);margin-bottom:10px;">Message</div>
            <div style="font-size:15px;color:rgba(255,255,255,0.85);line-height:1.7;">${data.message.replace(/\n/g, "<br/>")}</div>
          </div>
        </td></tr>
        <!-- Footer -->
        <tr>
          <td style="background:#080c14;padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:11px;color:rgba(255,255,255,0.25);">Sent via Astralearnia contact system · astralearnia.com</div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `
  <tr>
    <td style="padding:10px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:rgba(255,255,255,0.35);width:160px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;font-size:14px;color:rgba(255,255,255,0.82);font-weight:500;">${value}</td>
  </tr>`;
}

function buildAutoReply(data: ContactPayload): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#030508;font-family:'Segoe UI',Arial,sans-serif;color:#e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0d1622;border-radius:16px;overflow:hidden;border:1px solid rgba(0,200,255,0.15);">
        <tr>
          <td style="background:linear-gradient(135deg,#050d1a,#0a1428);padding:40px;text-align:center;border-bottom:1px solid rgba(0,200,255,0.12);">
            <div style="font-size:28px;font-weight:900;letter-spacing:-0.04em;color:#fff;">ASTRALEARNIA</div>
            <div style="font-size:11px;font-weight:700;letter-spacing:0.22em;color:rgba(0,200,255,0.7);margin-top:6px;text-transform:uppercase;">Engineering Intelligence · Empowering Minds</div>
          </td>
        </tr>
        <tr><td style="padding:40px;">
          <h2 style="font-size:22px;font-weight:800;color:#fff;margin:0 0 12px;">Hi ${data.firstName}, we got your message.</h2>
          <p style="font-size:15px;color:rgba(255,255,255,0.55);line-height:1.7;margin:0 0 24px;">
            Thank you for reaching out to Astralearnia. Our team has received your enquiry and a solutions specialist will be in touch within <strong style="color:#00c8ff;">24 business hours</strong>.
          </p>
          <div style="padding:18px 22px;background:rgba(0,200,255,0.06);border:1px solid rgba(0,200,255,0.18);border-radius:12px;margin-bottom:28px;">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:rgba(0,200,255,0.7);margin-bottom:6px;">Your Enquiry Reference</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.6);">Reason: ${data.reason}</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-top:4px;">Division: ${data.division.charAt(0).toUpperCase() + data.division.slice(1)}</div>
          </div>
          <p style="font-size:13px;color:rgba(255,255,255,0.35);line-height:1.6;">
            While you wait, explore our <a href="https://astralearnia.com/docs" style="color:#00c8ff;">documentation</a> or check out our <a href="https://astralearnia.com/blog" style="color:#00c8ff;">latest insights</a>.
          </p>
        </td></tr>
        <tr>
          <td style="background:#080c14;padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:11px;color:rgba(255,255,255,0.2);">© ${new Date().getFullYear()} Astralearnia Technologies Ltd. · astralearnia.com</div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const data: ContactPayload = await req.json();

    // Validation
    if (!data.email || !data.firstName || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    // Build sender address from env vars
    const fromName  = process.env.CONTACT_FROM_NAME  || "Astralearnia";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
    const from      = `${fromName} <${fromEmail}>`;

    // Parse comma-separated recipient list — supports up to 50 addresses
    const toRaw    = process.env.CONTACT_TO_EMAILS || fromEmail;
    const toEmails = toRaw.split(",").map((e) => e.trim()).filter(Boolean);

    const subject = `[Astralearnia] New ${data.division} enquiry from ${data.firstName} ${data.lastName}`;

    // 1. Notify your team (all configured email addresses)
    await sendEmail({
      apiKey,
      from,
      to: toEmails,
      replyTo: data.email,
      subject,
      html: buildHtmlEmail(data),
    });

    // 2. Auto-reply to the person who submitted the form
    await sendEmail({
      apiKey,
      from,
      to: [data.email],
      subject: `We received your message, ${data.firstName}`,
      html: buildAutoReply(data),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
function buildAutoReply(data: ContactPayload): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#030508;font-family:'Segoe UI',Arial,sans-serif;color:#e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0d1622;border-radius:16px;overflow:hidden;border:1px solid rgba(0,200,255,0.15);">
        <tr>
          <td style="background:linear-gradient(135deg,#050d1a,#0a1428);padding:40px;text-align:center;border-bottom:1px solid rgba(0,200,255,0.12);">
            <div style="font-size:28px;font-weight:900;letter-spacing:-0.04em;color:#fff;">ASTRALEARNIA</div>
            <div style="font-size:11px;font-weight:700;letter-spacing:0.22em;color:rgba(0,200,255,0.7);margin-top:6px;text-transform:uppercase;">Engineering Intelligence · Empowering Minds</div>
          </td>
        </tr>
        <tr><td style="padding:40px;">
          <h2 style="font-size:22px;font-weight:800;color:#fff;margin:0 0 12px;">Hi ${data.firstName}, we got your message.</h2>
          <p style="font-size:15px;color:rgba(255,255,255,0.55);line-height:1.7;margin:0 0 24px;">
            Thank you for reaching out to Astralearnia. Our team has received your enquiry and a solutions specialist will be in touch within <strong style="color:#00c8ff;">24 business hours</strong>.
          </p>
          <div style="padding:18px 22px;background:rgba(0,200,255,0.06);border:1px solid rgba(0,200,255,0.18);border-radius:12px;margin-bottom:28px;">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:rgba(0,200,255,0.7);margin-bottom:6px;">Your Enquiry Reference</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.6);">Reason: ${data.reason}</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-top:4px;">Division: ${data.division.charAt(0).toUpperCase() + data.division.slice(1)}</div>
          </div>
          <p style="font-size:13px;color:rgba(255,255,255,0.35);line-height:1.6;">
            While you wait, explore our <a href="https://astralearnia.com/docs" style="color:#00c8ff;">documentation</a> or check out our <a href="https://astralearnia.com/blog" style="color:#00c8ff;">latest insights</a>.
          </p>
        </td></tr>
        <tr>
          <td style="background:#080c14;padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:11px;color:rgba(255,255,255,0.2);">© ${new Date().getFullYear()} Astralearnia Technologies Ltd. · astralearnia.com</div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const data: ContactPayload = await req.json();

    // Basic validation
    if (!data.email || !data.firstName || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const toEmail = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || "";
    const subject = `[Astralearnia] New ${data.division} enquiry from ${data.firstName} ${data.lastName}`;

    // Send notification to Astralearnia team
    await transporter.sendMail({
      from: `"Astralearnia Contact" <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: data.email,
      subject,
      html: buildHtmlEmail(data),
    });

    // Send auto-reply to the submitter
    await transporter.sendMail({
      from: `"Astralearnia" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `We received your message, ${data.firstName}`,
      html: buildAutoReply(data),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
