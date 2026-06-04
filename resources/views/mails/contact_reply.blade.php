<!DOCTYPE html>
<html>
<head>
    <title>Reply from {{ config('app.name') }}</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
    <h2>Hello {{ $contactMessage->name }},</h2>
    
    <p>Thank you for reaching out to us. We have received your message regarding:</p>
    <blockquote style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #f97316; margin: 10px 0;">
        "{{ $contactMessage->message }}"
    </blockquote>

    <p><strong>Here is our response:</strong></p>
    <p>{!! nl2br(e($replyMessage)) !!}</p>

    <br>
    <p>Best regards,<br>The {{ config('app.name') }} Team</p>
</body>
</html>
