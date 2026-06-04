<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PublicPageController;

Route::get('/', [PublicPageController::class, 'home'])->name('home');
Route::get('/about', [PublicPageController::class, 'about'])->name('about');
Route::get('/facilities', [PublicPageController::class, 'facilities'])->name('facilities');
Route::get('/properties', [PublicPageController::class, 'properties'])->name('properties.index');
Route::get('/properties/{id}', [PublicPageController::class, 'propertyShow'])->name('properties.show');
Route::get('/blog', [PublicPageController::class, 'blog'])->name('blog.index');
Route::get('/blog/{id}', [PublicPageController::class, 'blogShow'])->name('blog.show');
Route::get('/contact', [PublicPageController::class, 'contact'])->name('contact');
Route::post('/contact', [PublicPageController::class, 'contactSubmit'])->name('contact.submit');
Route::post('/subscribe', [PublicPageController::class, 'subscribe'])->name('subscribe');
Route::get('/privacy', [PublicPageController::class, 'privacy'])->name('privacy');
Route::get('/terms', [PublicPageController::class, 'terms'])->name('terms');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
