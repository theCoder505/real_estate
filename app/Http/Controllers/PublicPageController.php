<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Property;
use App\Models\BlogPost;
use App\Models\Facility;
use App\Models\Testimonial;
use App\Models\Setting;

class PublicPageController extends Controller
{
    public function home()
    {
        $featuredProperties = Property::where('featured', true)->get();
        $latestNews = BlogPost::orderBy('published_at', 'desc')->take(2)->get();
        $testimonials = Testimonial::all();

        return Inertia::render('home', [
            'featuredProperties' => $featuredProperties,
            'latestNews' => $latestNews,
            'testimonials' => $testimonials,
            'stats' => [
                'experience' => 10,
                'buildings' => 120,
                'clients' => 500,
            ]
        ]);
    }

    public function about()
    {
        return Inertia::render('about', [
            'stats' => [
                'experience' => 10,
                'buildings' => 120,
                'clients' => 500,
                'agents' => 15
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

        // Simulating newsletter list subscription:
        return redirect()->back()->with('success', 'Subscribed successfully! Thank you for joining our newsletter.');
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
