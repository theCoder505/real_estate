<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function edit()
    {
        $settings = Setting::first();
        return Inertia::render('admin/settings', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $settings = Setting::first();
        
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'required|string|max:50',
            'contact_address' => 'required|string|max:255',
            'facebook_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'google_map_iframe' => 'nullable|string',
        ]);

        if ($request->hasFile('logo')) {
            $request->validate(['logo' => 'image|mimes:png,jpg,jpeg,svg|max:2048']);
            $file = $request->file('logo');
            $file->move(public_path('assets/images'), 'logo.png');
        }

        if ($request->hasFile('icon')) {
            $request->validate(['icon' => 'image|mimes:png|max:2048']);
            $file = $request->file('icon');
            $file->move(public_path('assets/images'), 'icon.png');
            $validated['icon_path'] = 'assets/images/icon.png';
        }

        $settings->update($validated);

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}
