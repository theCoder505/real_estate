<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Facility;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function index()
    {
        $facilities = Facility::latest()->get();
        return Inertia::render('admin/facilities/index', [
            'facilities' => $facilities
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        Facility::create($validated);

        return redirect()->back()->with('success', 'Facility created successfully.');
    }

    public function update(Request $request, Facility $facility)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $facility->update($validated);

        return redirect()->back()->with('success', 'Facility updated successfully.');
    }

    public function destroy(Facility $facility)
    {
        $facility->delete();
        return redirect()->back()->with('success', 'Facility deleted successfully.');
    }
}
