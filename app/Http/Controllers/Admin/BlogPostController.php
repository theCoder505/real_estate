<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BlogPost;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::latest()->get();
        return Inertia::render('admin/blog/index', [
            'posts' => $posts
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'published_at' => 'nullable|date',
            'image' => 'nullable|image|max:2048'
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'blog_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('assets/images'), $filename);
            $validated['image_path'] = 'assets/images/' . $filename;
        }

        BlogPost::create($validated);

        return redirect()->back()->with('success', 'Blog post created successfully.');
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'published_at' => 'nullable|date',
            'image' => 'nullable|image|max:2048'
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            if ($blogPost->image_path && !str_starts_with($blogPost->image_path, 'http')) {
                if (File::exists(public_path($blogPost->image_path))) {
                    File::delete(public_path($blogPost->image_path));
                }
            }

            $file = $request->file('image');
            $filename = 'blog_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('assets/images'), $filename);
            $validated['image_path'] = 'assets/images/' . $filename;
        }

        $blogPost->update($validated);

        return redirect()->back()->with('success', 'Blog post updated successfully.');
    }

    public function destroy(BlogPost $blogPost)
    {
        if ($blogPost->image_path && !str_starts_with($blogPost->image_path, 'http')) {
            if (File::exists(public_path($blogPost->image_path))) {
                File::delete(public_path($blogPost->image_path));
            }
        }
        
        $blogPost->delete();
        
        return redirect()->back()->with('success', 'Blog post deleted successfully.');
    }
}
