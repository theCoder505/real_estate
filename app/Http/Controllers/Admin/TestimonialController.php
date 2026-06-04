<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Testimonial;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::latest()->get();
        return Inertia::render('admin/testimonials/index', [
            'testimonials' => $testimonials
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'testimonial_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('assets/images'), $filename);
            $validated['image_path'] = 'assets/images/' . $filename;
        }

        Testimonial::create($validated);

        return redirect()->back()->with('success', 'Testimonial created successfully.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            if ($testimonial->image_path && !str_starts_with($testimonial->image_path, 'http')) {
                if (File::exists(public_path($testimonial->image_path))) {
                    File::delete(public_path($testimonial->image_path));
                }
            }

            $file = $request->file('image');
            $filename = 'testimonial_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('assets/images'), $filename);
            $validated['image_path'] = 'assets/images/' . $filename;
        }

        $testimonial->update($validated);

        return redirect()->back()->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->image_path && !str_starts_with($testimonial->image_path, 'http')) {
            if (File::exists(public_path($testimonial->image_path))) {
                File::delete(public_path($testimonial->image_path));
            }
        }
        
        $testimonial->delete();
        
        return redirect()->back()->with('success', 'Testimonial deleted successfully.');
    }
}
