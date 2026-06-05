<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactOtpMail;

use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'message' => 'required|string|min:10',
        ]);

        // Generate OTP
        $otp = (string) rand(100000, 999999);

        // Store message (unverified)
        $contactMessage = ContactMessage::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'message' => $request->message,
            'otp_code' => $otp,
            'otp_expires_at' => Carbon::now()->addMinutes(10),
            'verified' => false,
        ]);

        try {
            // Send OTP via email
            Mail::to($request->email)->send(new ContactOtpMail($otp));
        } catch (\Exception $e) {
            Log::error('Failed to send contact OTP email: ' . $e->getMessage());
            $contactMessage->delete();
            return redirect()->back()
                ->withInput()
                ->withErrors(['email' => 'Failed to send OTP to your email. Please verify if the email is correct.']);
        }

        return redirect()->back()
            ->with('success', 'An OTP has been sent to your email. Please verify to complete your submission.')
            ->with('contact_message_id', $contactMessage->id);
    }

    public function verifyOtp(Request $request)
    {
        // Handled by VerifyContactOtp middleware
        $message = ContactMessage::find($request->contact_message_id);

        // Send notification to admin (optional, can be done here or in an observer)
        // Mail::to(config('mail.from.address'))->send(new ContactNotificationMail($message));

        return redirect()->back()->with('success', 'Thank you! Your message has been verified and sent successfully.');
    }
}
