<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ContactMessage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactReplyMail;

class ContactMessageController extends Controller
{
    public function index()
    {
        // Only show verified messages to the admin
        $messages = ContactMessage::where('verified', true)->latest()->get();
        return Inertia::render('admin/contact/index', [
            'messages' => $messages
        ]);
    }

    public function reply(Request $request, ContactMessage $contactMessage)
    {
        $request->validate([
            'reply_message' => 'required|string|min:5'
        ]);

        // Send reply email
        Mail::to($contactMessage->email)->send(new ContactReplyMail($request->reply_message, $contactMessage));

        return redirect()->back()->with('success', 'Reply sent successfully.');
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();
        return redirect()->back()->with('success', 'Message deleted successfully.');
    }
}
