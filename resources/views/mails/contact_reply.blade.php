<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reply from {{ config('app.name') }}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f0ef;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f0ef;padding:48px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

                    <!-- Brand pill -->
                    <tr>
                        <td align="center" style="padding-bottom:28px;">
                            <table role="presentation" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background:linear-gradient(135deg,#ea580c,#c2410c);border-radius:12px;padding:10px 22px;">
                                        <span style="font-size:17px;font-weight:800;color:#ffffff;letter-spacing:-0.3px;">{{ config('app.name') }}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Card -->
                    <tr>
                        <td style="background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.08);">

                            <!-- Hero band -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background:linear-gradient(135deg,#18181b 0%,#3f3f46 100%);padding:40px 48px 36px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="background:rgba(234,88,12,0.25);border-radius:50%;width:52px;height:52px;text-align:center;vertical-align:middle;">
                                                    <span style="font-size:24px;line-height:52px;">💬</span>
                                                </td>
                                                <td style="padding-left:16px;">
                                                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:2.5px;font-weight:700;">Message Reply</p>
                                                    <h1 style="margin:4px 0 0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.4px;">We've Responded to You</h1>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Greeting -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding:40px 48px 0;">
                                        <p style="margin:0 0 6px;font-size:18px;font-weight:700;color:#18181b;">Hello, {{ $contactMessage->name }} 👋</p>
                                        <p style="margin:0 0 28px;font-size:14px;line-height:1.75;color:#52525b;">
                                            Thank you for getting in touch with us. Our team has reviewed your message and prepared a response for you below.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Original message -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding:0 48px 24px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border-radius:12px;border:1px solid #f4f4f5;overflow:hidden;">
                                            <tr>
                                                <td style="background:#f4f4f5;padding:10px 18px;">
                                                    <p style="margin:0;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1.5px;">Your original message</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:16px 18px;border-left:3px solid #ea580c;">
                                                    <p style="margin:0;font-size:13px;color:#71717a;line-height:1.7;font-style:italic;">"{{ $contactMessage->message }}"</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Our reply -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding:0 48px 40px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(160deg,#fff7ed,#ffedd5);border:1.5px solid #fed7aa;border-radius:16px;">
                                            <tr>
                                                <td style="padding:10px 20px;border-bottom:1px solid #fed7aa;">
                                                    <table role="presentation" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td style="background:#ea580c;border-radius:50%;width:28px;height:28px;text-align:center;vertical-align:middle;">
                                                                <span style="font-size:13px;line-height:28px;color:#fff;">★</span>
                                                            </td>
                                                            <td style="padding-left:10px;">
                                                                <p style="margin:0;font-size:12px;font-weight:700;color:#9a3412;text-transform:uppercase;letter-spacing:1.5px;">Our Response</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:20px 20px 24px;">
                                                    <p style="margin:0;font-size:14px;color:#3f3f46;line-height:1.8;">{!! nl2br(e($replyMessage)) !!}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Sign-off -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding:0 48px 40px;">
                                        <p style="margin:0 0 4px;font-size:14px;color:#52525b;line-height:1.7;">If you have any follow-up questions, feel free to reach out to us anytime. We're always happy to help.</p>
                                        <p style="margin:20px 0 0;font-size:14px;font-weight:700;color:#18181b;">Warm regards,</p>
                                        <p style="margin:2px 0 0;font-size:14px;color:#ea580c;font-weight:800;">The {{ config('app.name') }} Team</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Divider + CTA (optional) -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding:0 48px 40px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:12px;border:1px solid #f4f4f5;padding:20px 24px;">
                                            <tr>
                                                <td>
                                                    <p style="margin:0;font-size:12px;color:#a1a1aa;line-height:1.7;">
                                                        📌 &nbsp;This reply is in response to a message you submitted via our website contact form. If this was not you, please disregard this email.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Footer -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background:#18181b;padding:24px 48px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <p style="margin:0;font-size:13px;font-weight:700;color:#ffffff;">{{ config('app.name') }}</p>
                                                    <p style="margin:2px 0 0;font-size:11px;color:#71717a;">Your trusted real estate development partner</p>
                                                </td>
                                                <td align="right">
                                                    <p style="margin:0;font-size:11px;color:#52525b;">&copy; {{ date('Y') }} All rights reserved.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Bottom note -->
                    <tr>
                        <td align="center" style="padding-top:20px;">
                            <p style="margin:0;font-size:11px;color:#a1a1aa;">This is an automated email. Please do not reply directly to this message.</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>