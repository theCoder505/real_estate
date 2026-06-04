<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Property;
use App\Models\BlogPost;
use App\Models\Facility;
use App\Models\Testimonial;
use App\Models\ContactMessage;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'properties'   => Property::count(),
                'blog_posts'   => BlogPost::count(),
                'facilities'   => Facility::count(),
                'testimonials' => Testimonial::count(),
                'messages'     => ContactMessage::where('verified', true)->count(),
                'featured'     => Property::where('featured', true)->count(),
            ],
            'recentMessages' => ContactMessage::where('verified', true)
                ->latest()
                ->take(5)
                ->get(['id', 'name', 'email', 'message', 'created_at']),
            'recentProperties' => Property::latest()
                ->take(5)
                ->get(['id', 'title', 'type', 'price', 'status', 'created_at']),
        ]);
    }
}
