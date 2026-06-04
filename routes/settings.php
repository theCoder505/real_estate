<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('settings/send-otp', [ProfileController::class, 'sendOtp'])->name('profile.send-otp');

    // Password and appearance are now on the same page as profile
    Route::redirect('settings/password', '/settings/profile')->name('password.edit');
    Route::redirect('settings/appearance', '/settings/profile')->name('appearance');
});
