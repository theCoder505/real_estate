<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FacilityController;
use App\Http\Controllers\Admin\PropertyController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\NewsletterSubscriberController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\ContactController;
use App\Http\Middleware\VerifyContactOtp;
use Illuminate\Support\Facades\Artisan;


Route::get('/', [PublicPageController::class, 'home'])->name('home');
Route::get('/about', [PublicPageController::class, 'about'])->name('about');
Route::get('/facilities', [PublicPageController::class, 'facilities'])->name('facilities');
Route::get('/properties', [PublicPageController::class, 'properties'])->name('properties.index');
Route::get('/properties/{id}', [PublicPageController::class, 'propertyShow'])->name('properties.show');
Route::get('/blog', [PublicPageController::class, 'blog'])->name('blog.index');
Route::get('/blog/{id}', [PublicPageController::class, 'blogShow'])->name('blog.show');
Route::get('/contact', [PublicPageController::class, 'contact'])->name('contact');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');
Route::post('/contact/verify', [ContactController::class, 'verifyOtp'])->middleware(VerifyContactOtp::class)->name('contact.verify');
Route::post('/subscribe', [PublicPageController::class, 'subscribe'])->name('subscribe');
Route::get('/privacy', [PublicPageController::class, 'privacy'])->name('privacy');
Route::get('/terms', [PublicPageController::class, 'terms'])->name('terms');
Route::get('/testimonials', [PublicPageController::class, 'testimonials'])->name('testimonials');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/settings', [SettingController::class, 'edit'])->name('settings.edit');
    Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');
    Route::post('/settings', [SettingController::class, 'update']);

    Route::resource('properties', PropertyController::class)->except(['create', 'show', 'edit']);
    Route::resource('blog', BlogPostController::class)->except(['create', 'show', 'edit']);
    Route::resource('facilities', FacilityController::class)->except(['create', 'show', 'edit']);
    Route::resource('testimonials', TestimonialController::class)->except(['create', 'show', 'edit']);
    Route::resource('team-members', TeamMemberController::class)->except(['create', 'show', 'edit']);
    
    Route::get('contact-messages', [ContactMessageController::class, 'index'])->name('contact.index');
    Route::post('contact-messages/{contactMessage}/reply', [ContactMessageController::class, 'reply'])->name('contact.reply');
    Route::delete('contact-messages/{contactMessage}', [ContactMessageController::class, 'destroy'])->name('contact.destroy');

    Route::get('newsletter-subscribers', [NewsletterSubscriberController::class, 'index'])->name('newsletter.index');
    Route::delete('newsletter-subscribers/{subscriber}', [NewsletterSubscriberController::class, 'destroy'])->name('newsletter.destroy');
});



Route::get('/clear', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('config:cache');
    Artisan::call('view:clear');
    Artisan::call('route:clear');
    Artisan::call('storage:link');
    return "Cleared!";
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
