<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BlogPost;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

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
            'image' => 'nullable|image|max:10240'
        ]);
        $validated['slug'] = Str::slug($validated['title']);
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'blog_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('assets/images'), $filename);
            $validated['image_path'] = '/assets/images/' . $filename;
        }
        BlogPost::create($validated);
        return redirect()->route('admin.blog.index')->with('success', 'Blog post created successfully.');
    }

    public function update(Request $request, BlogPost $blog)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'category' => 'required|string|max:255',
                'author' => 'required|string|max:255',
                'excerpt' => 'required|string',
                'content' => 'required|string',
                'published_at' => 'nullable|date',
                'image' => 'nullable|image|max:10240'
            ]);

            $validated['slug'] = Str::slug($validated['title']);

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists and is local
                if ($blog->image_path && !str_contains($blog->image_path, 'http')) {
                    $oldImagePath = public_path($blog->image_path);
                    if (File::exists($oldImagePath)) {
                        File::delete($oldImagePath);
                    }
                }

                // Upload new image
                $file = $request->file('image');
                $filename = 'blog_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('assets/images'), $filename);
                $validated['image_path'] = '/assets/images/' . $filename;
            }

            $blog->update($validated);
            return redirect()->route('admin.blog.index')->with('success', 'Blog post updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to update blog post: ' . $e->getMessage()]);
        }
    }

    public function destroy(BlogPost $blog)
    {
        if ($blog->image_path && !str_contains($blog->image_path, 'http')) {
            $imagePath = public_path($blog->image_path);
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }
        }
        $blog->delete();
        return redirect()->route('admin.blog.index')->with('success', 'Blog post deleted successfully.');
    }
}