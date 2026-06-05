<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Email Change – {{ $brandname }}</title>
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
                                        <span style="font-size:17px;font-weight:800;color:#ffffff;letter-spacing:-0.3px;">{{ $brandname }}</span>
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
                                                    <span style="font-size:24px;line-height:52px;">📧</span>
                                                </td>
                                                <td style="padding-left:16px;">
                                                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:2.5px;font-weight:700;">Account Security</p>
                                                    <h1 style="margin:4px 0 0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.4px;">Email Change Request</h1>
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

                                        <p style="margin:0 0 6px;font-size:18px;font-weight:700;color:#18181b;">Hello, {{ $user->name }} 👋</p>
                                        <p style="margin:0 0 24px;font-size:14px;line-height:1.75;color:#52525b;">
                                            We received a request to change the email address associated with your <strong style="color:#18181b;">{{ $brandname }}</strong> account. Use the verification code below to confirm this change.
                                        </p>

                                        <!-- OTP block -->
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 28px;">
                                            <tr>
                                                <td align="center" style="background:linear-gradient(160deg,#fff7ed,#ffedd5);border:1.5px solid #fed7aa;border-radius:16px;padding:32px 24px;">
                                                    <p style="margin:0 0 10px;font-size:11px;color:#c2410c;text-transform:uppercase;letter-spacing:2.5px;font-weight:800;">Your Verification Code</p>
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

                                        <!-- Security notice -->
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border-radius:12px;border:1px solid #f4f4f5;margin-bottom:24px;">
                                            <tr>
                                                <td style="padding:18px 20px;border-left:3px solid #ea580c;">
                                                    <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#18181b;text-transform:uppercase;letter-spacing:1px;">🔒 Security Notice</p>
                                                    <p style="margin:0;font-size:13px;color:#71717a;line-height:1.6;">If you did not request an email change, your account may be at risk. Please ignore this email and consider updating your password immediately.</p>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="margin:0;font-size:12px;color:#a1a1aa;line-height:1.7;">
                                            This code is valid for a single use only and will expire automatically after 10 minutes.
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
                                                    <p style="margin:0;font-size:13px;font-weight:700;color:#ffffff;">{{ $brandname }}</p>
                                                    <p style="margin:2px 0 0;font-size:11px;color:#71717a;">Keeping your account safe</p>
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
                            <p style="margin:0;font-size:11px;color:#a1a1aa;">This is an automated security email. Please do not reply directly.</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>