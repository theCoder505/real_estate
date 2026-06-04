<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\ContactMessage;

class ContactReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public $replyMessage;
    public $contactMessage;

    public function __construct($replyMessage, ContactMessage $contactMessage)
    {
        $this->replyMessage = $replyMessage;
        $this->contactMessage = $contactMessage;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Re: Your Inquiry to ' . config('app.name'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mails.contact_reply',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
