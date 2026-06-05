<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Property;
use App\Models\BlogPost;
use App\Models\Facility;
use App\Models\Testimonial;
use App\Models\Setting;
use App\Models\TeamMember;
use App\Models\NewsletterSubscriber;

class PublicPageController extends Controller
{
    public function home()
    {
        $featuredProperties = Property::where('featured', true)->get();
        $latestNews = BlogPost::orderBy('published_at', 'desc')->take(2)->get();
        $testimonials = Testimonial::take(10)->get();
        $settings = Setting::first();

        return Inertia::render('home', [
            'featuredProperties' => $featuredProperties,
            'latestNews' => $latestNews,
            'testimonials' => $testimonials,
            'settings' => $settings,
            'stats' => [
                'experience' => $settings->years_of_experience ?? 10,
                'buildings' => $settings->building_finished ?? 120,
                'clients' => $settings->satisfied_clients ?? 500,
            ]
        ]);
    }

    public function about()
    {
        $settings = Setting::first();
        $team = TeamMember::all();

        return Inertia::render('about', [
            'team' => $team,
            'settings' => $settings,
            'stats' => [
                'experience' => $settings->years_of_experience ?? 10,
                'buildings' => $settings->building_finished ?? 120,
                'clients' => $settings->satisfied_clients ?? 500,
                'agents' => $settings->expert_agents ?? 15,
            ]
        ]);
    }

    public function facilities()
    {
        $facilitiesList = Facility::all();
        return Inertia::render('facilities', [
            'facilities' => $facilitiesList
        ]);
    }

    public function properties(Request $request)
    {
        $query = Property::query();

        // Filter by Search Query (Title or Location)
        if ($request->filled('search')) {
            $search = strtolower($request->input('search'));
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        // Filter by Type
        if ($request->filled('type') && $request->input('type') !== 'all') {
            $query->where('type', $request->input('type'));
        }

        // Filter by Max Price
        if ($request->filled('price_max')) {
            $query->where('price', '<=', $request->input('price_max'));
        }

        $properties = $query->get();

        return Inertia::render('properties/index', [
            'properties' => $properties,
            'filters' => $request->only(['search', 'type', 'price_max'])
        ]);
    }

    public function propertyShow($id)
    {
        $property = Property::findOrFail($id);

        // Suggest related properties
        $related = Property::where('id', '!=', $property->id)
            ->where('type', $property->type)
            ->take(3)
            ->get();

        return Inertia::render('properties/show', [
            'property' => $property,
            'relatedProperties' => $related
        ]);
    }

    public function blog()
    {
        $posts = BlogPost::orderBy('published_at', 'desc')->get();

        return Inertia::render('blog/index', [
            'posts' => $posts
        ]);
    }

    public function blogShow($id)
    {
        $post = BlogPost::findOrFail($id);

        // Suggest related posts
        $related = BlogPost::where('id', '!=', $post->id)
            ->take(2)
            ->get();

        return Inertia::render('blog/show', [
            'post' => $post,
            'relatedPosts' => $related
        ]);
    }

    public function contact()
    {
        return Inertia::render('contact');
    }

    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255',
        ]);

        $exists = NewsletterSubscriber::where('email', $request->email)->exists();
        if ($exists) {
            return redirect()->back()->withErrors(['email' => 'You are already subscribed to our newsletter!']);
        }

        NewsletterSubscriber::create([
            'email' => $request->email
        ]);

        return redirect()->back()->with('success', 'Subscribed successfully! Thank you for joining our newsletter.');
    }

    public function testimonials()
    {
        $testimonials = Testimonial::latest()->get();
        return Inertia::render('testimonials', [
            'testimonials' => $testimonials
        ]);
    }

    public function privacy()
    {
        return Inertia::render('privacy');
    }

    public function terms()
    {
        return Inertia::render('terms');
    }
}
