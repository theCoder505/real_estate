<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\ContactMessage;
use Carbon\Carbon;

class VerifyContactOtp
{
    public function handle(Request $request, Closure $next)
    {
        $request->validate([
            'email' => 'required|email',
            'otp_code' => 'required|string|size:6',
        ]);

        $message = ContactMessage::where('email', $request->email)
            ->latest()
            ->first();

        if (!$message || $message->otp_code !== $request->otp_code) {
            return redirect()->back()->with('error', 'Invalid OTP code.');
        }

        if (Carbon::now()->greaterThan($message->otp_expires_at)) {
            return redirect()->back()->with('error', 'OTP code has expired. Please request a new one.');
        }

        // Mark as verified
        $message->verified = true;
        $message->save();

        // Pass the message instance to the controller
        $request->merge(['contact_message_id' => $message->id]);

        return $next($request);
    }
}
