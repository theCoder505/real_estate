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
            'image' => 'nullable|image|max:10240'
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'property_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('assets/images'), $filename);
            $validated['image_path'] = '/assets/images/' . $filename;
        }

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
            'image' => 'nullable|image|max:10240'
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            // Delete old image if it exists and isn't a mock URL
            if ($property->image_path && !str_starts_with($property->image_path, 'http')) {
                if (File::exists(public_path($property->image_path))) {
                    File::delete(public_path($property->image_path));
                }
            }

            $file = $request->file('image');
            $filename = 'property_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('assets/images'), $filename);
            $validated['image_path'] = '/assets/images/' . $filename;
        }

        $property->update($validated);

        return redirect()->back()->with('success', 'Property updated successfully.');
    }

    public function destroy(Property $property)
    {
        if ($property->image_path && !str_starts_with($property->image_path, 'http')) {
            if (File::exists(public_path($property->image_path))) {
                File::delete(public_path($property->image_path));
            }
        }
        
        $property->delete();
        
        return redirect()->back()->with('success', 'Property deleted successfully.');
    }
}
