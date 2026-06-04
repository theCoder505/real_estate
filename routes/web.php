<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PublicPageController;

use App\Http\Controllers\ContactController;

Route::get('/', [PublicPageController::class, 'home'])->name('home');
Route::get('/about', [PublicPageController::class, 'about'])->name('about');
Route::get('/facilities', [PublicPageController::class, 'facilities'])->name('facilities');
Route::get('/properties', [PublicPageController::class, 'properties'])->name('properties.index');
Route::get('/properties/{id}', [PublicPageController::class, 'propertyShow'])->name('properties.show');
Route::get('/blog', [PublicPageController::class, 'blog'])->name('blog.index');
Route::get('/blog/{id}', [PublicPageController::class, 'blogShow'])->name('blog.show');
Route::get('/contact', [PublicPageController::class, 'contact'])->name('contact');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');
Route::post('/contact/verify', [ContactController::class, 'verifyOtp'])->middleware(\App\Http\Middleware\VerifyContactOtp::class)->name('contact.verify');
Route::post('/subscribe', [PublicPageController::class, 'subscribe'])->name('subscribe');
Route::get('/privacy', [PublicPageController::class, 'privacy'])->name('privacy');
Route::get('/terms', [PublicPageController::class, 'terms'])->name('terms');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Settings
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'edit'])->name('settings.edit');
    Route::put('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update']); // fallback for multipart/form-data method spoofing

    // Resources
    Route::resource('properties', \App\Http\Controllers\Admin\PropertyController::class)->except(['create', 'show', 'edit']);
    Route::resource('blog', \App\Http\Controllers\Admin\BlogPostController::class)->except(['create', 'show', 'edit']);
    Route::resource('facilities', \App\Http\Controllers\Admin\FacilityController::class)->except(['create', 'show', 'edit']);
    Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class)->except(['create', 'show', 'edit']);
    
    // Contact Messages
    Route::get('contact-messages', [\App\Http\Controllers\Admin\ContactMessageController::class, 'index'])->name('contact.index');
    Route::post('contact-messages/{contactMessage}/reply', [\App\Http\Controllers\Admin\ContactMessageController::class, 'reply'])->name('contact.reply');
    Route::delete('contact-messages/{contactMessage}', [\App\Http\Controllers\Admin\ContactMessageController::class, 'destroy'])->name('contact.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
