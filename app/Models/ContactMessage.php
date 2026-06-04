<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'message',
        'otp_code',
        'otp_expires_at',
        'verified',
    ];

    protected $casts = [
        'otp_expires_at' => 'datetime',
        'verified' => 'boolean',
    ];
}
