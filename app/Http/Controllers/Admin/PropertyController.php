<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Property;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class PropertyController extends Controller
{
    public function index()
    {
        $properties = Property::latest()->get();
        return Inertia::render('admin/properties/index', [
            'properties' => $properties
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string',
            'price' => 'required|numeric',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'beds' => 'required|integer',
            'baths' => 'required|numeric',
            'sqft' => 'required|integer',
            'status' => 'required|string',
            'featured' => 'boolean',
            'features' => 'nullable|array',
            'image' => 'nullable|image|max:10240',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|max:10240'
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'property_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('assets/images'), $filename);
            $validated['image_path'] = 'assets/images/' . $filename;
        }

        $galleryPaths = [];
        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $idx => $file) {
                $filename = 'property_gallery_' . time() . '_' . $idx . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('assets/images/gallery'), $filename);
                $galleryPaths[] = 'assets/images/gallery/' . $filename;
            }
        }
        $validated['images'] = $galleryPaths;

        Property::create($validated);

        return redirect()->back()->with('success', 'Property created successfully.');
    }

    public function update(Request $request, Property $property)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string',
            'price' => 'required|numeric',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'beds' => 'required|integer',
            'baths' => 'required|numeric',
            'sqft' => 'required|integer',
            'status' => 'required|string',
            'featured' => 'boolean',
            'features' => 'nullable|array',
            'image' => 'nullable|image|max:10240',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|max:10240',
            'remove_images' => 'nullable|array',
            'remove_images.*' => 'string'
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            // Delete old image if it exists and isn't a mock URL
            if ($property->image_path && !str_starts_with($property->image_path, 'http')) {
                $localPath = ltrim($property->image_path, '/');
                if (File::exists(public_path($localPath))) {
                    File::delete(public_path($localPath));
                }
            }

            $file = $request->file('image');
            $filename = 'property_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('assets/images'), $filename);
            $validated['image_path'] = 'assets/images/' . $filename;
        }

        // Handle gallery images removal
        $currentImages = $property->images ?? [];
        if ($request->has('remove_images')) {
            foreach ($request->input('remove_images') as $imgToRemove) {
                $localImgPath = ltrim($imgToRemove, '/');
                if (File::exists(public_path($localImgPath))) {
                    File::delete(public_path($localImgPath));
                }
                $currentImages = array_values(array_filter($currentImages, function($img) use ($imgToRemove) {
                    return ltrim($img, '/') !== ltrim($imgToRemove, '/');
                }));
            }
        }

        // Handle new gallery images upload
        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $idx => $file) {
                $filename = 'property_gallery_' . time() . '_' . $idx . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('assets/images/gallery'), $filename);
                $currentImages[] = 'assets/images/gallery/' . $filename;
            }
        }

        $validated['images'] = $currentImages;

        $property->update($validated);

        return redirect()->back()->with('success', 'Property updated successfully.');
    }

    public function destroy(Property $property)
    {
        if ($property->image_path && !str_starts_with($property->image_path, 'http')) {
            $localPath = ltrim($property->image_path, '/');
            if (File::exists(public_path($localPath))) {
                File::delete(public_path($localPath));
            }
        }

        if ($property->images && is_array($property->images)) {
            foreach ($property->images as $img) {
                if (!str_starts_with($img, 'http')) {
                    $localImgPath = ltrim($img, '/');
                    if (File::exists(public_path($localImgPath))) {
                        File::delete(public_path($localImgPath));
                    }
                }
            }
        }
        
        $property->delete();
        
        return redirect()->back()->with('success', 'Property deleted successfully.');
    }
}
