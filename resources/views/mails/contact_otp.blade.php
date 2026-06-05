<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email – {{ config('app.name') }}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f0ef;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f0ef;padding:48px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

                    <!-- Logo / Brand bar -->
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
                                    <td style="background:linear-gradient(135deg,#ea580c 0%,#9a3412 100%);padding:40px 48px 36px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="background:rgba(255,255,255,0.15);border-radius:50%;width:52px;height:52px;text-align:center;vertical-align:middle;">
                                                    <span style="font-size:24px;line-height:52px;">✉️</span>
                                                </td>
                                                <td style="padding-left:16px;">
                                                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:2.5px;font-weight:700;">Email Verification</p>
                                                    <h1 style="margin:4px 0 0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.4px;">Confirm Your Identity</h1>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Body -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding:40px 48px 32px;">
                                        <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#3f3f46;">
                                            Thank you for reaching out to us. To keep your submission secure, please use the one-time verification code below to complete your request.
                                        </p>

                                        <!-- OTP block -->
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
                                            <tr>
                                                <td align="center" style="background:linear-gradient(160deg,#fff7ed,#ffedd5);border:1.5px solid #fed7aa;border-radius:16px;padding:32px 24px;">
                                                    <p style="margin:0 0 10px;font-size:11px;color:#c2410c;text-transform:uppercase;letter-spacing:2.5px;font-weight:800;">Your One-Time Code</p>
                                                    <p style="margin:0;font-size:44px;font-weight:900;letter-spacing:12px;color:#ea580c;font-family:'Courier New',Courier,monospace;line-height:1;">{{ $otp }}</p>
                                                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                                                        <tr>
                                                            <td style="background:#fff;border:1px solid #fdba74;border-radius:20px;padding:5px 14px;">
                                                                <span style="font-size:12px;color:#9a3412;font-weight:600;">⏱ Expires in 10 minutes</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Steps -->
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border-radius:12px;border:1px solid #f4f4f5;padding:20px 24px;margin-bottom:24px;">
                                            <tr>
                                                <td>
                                                    <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:1.5px;">How to verify</p>
                                                    <table role="presentation" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td style="vertical-align:top;padding-bottom:10px;">
                                                                <span style="display:inline-block;background:#ea580c;color:#fff;border-radius:50%;width:20px;height:20px;text-align:center;font-size:11px;font-weight:800;line-height:20px;">1</span>
                                                            </td>
                                                            <td style="padding-left:10px;padding-bottom:10px;font-size:13px;color:#52525b;vertical-align:top;">Go back to the form you were filling out.</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="vertical-align:top;padding-bottom:10px;">
                                                                <span style="display:inline-block;background:#ea580c;color:#fff;border-radius:50%;width:20px;height:20px;text-align:center;font-size:11px;font-weight:800;line-height:20px;">2</span>
                                                            </td>
                                                            <td style="padding-left:10px;padding-bottom:10px;font-size:13px;color:#52525b;vertical-align:top;">Enter the 6-digit code shown above in the OTP field.</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="vertical-align:top;">
                                                                <span style="display:inline-block;background:#ea580c;color:#fff;border-radius:50%;width:20px;height:20px;text-align:center;font-size:11px;font-weight:800;line-height:20px;">3</span>
                                                            </td>
                                                            <td style="padding-left:10px;font-size:13px;color:#52525b;vertical-align:top;">Click <strong>Verify &amp; Submit</strong> to send your message.</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="margin:0;font-size:12px;color:#a1a1aa;line-height:1.7;">
                                            Didn't request this? No action needed — simply ignore this email and the code will expire automatically.
                                        </p>
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
                                                    <p style="margin:2px 0 0;font-size:11px;color:#71717a;">Secure communications for our clients</p>
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
                            <p style="margin:0;font-size:11px;color:#a1a1aa;">This is an automated email. Please do not reply directly.</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>