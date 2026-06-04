<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function edit()
    {
        $settings = Setting::first();

        // Map DB columns to flat frontend fields
        $mapped = $settings ? [
            'id'               => $settings->id,
            'company_name'     => $settings->brand_name,
            'contact_email'    => $settings->contact_email,
            'contact_phone'    => $settings->contact_phone,
            'contact_address'  => $settings->address,
            'facebook_url'     => $settings->social_links['facebook'] ?? '',
            'twitter_url'      => $settings->social_links['twitter'] ?? '',
            'instagram_url'    => $settings->social_links['instagram'] ?? '',
            'linkedin_url'     => $settings->social_links['linkedin'] ?? '',
            'google_map_iframe'=> $settings->google_map_iframe,
            'logo_path'        => $settings->logo_path,
            'icon_path'        => $settings->icon_path,
        ] : null;

        return Inertia::render('admin/settings', [
            'settings' => $mapped
        ]);
    }

    public function update(Request $request)
    {
        $settings = Setting::first();

        $request->validate([
            'company_name'     => 'required|string|max:255',
            'contact_email'    => 'required|email|max:255',
            'contact_phone'    => 'required|string|max:50',
            'contact_address'  => 'required|string|max:255',
            'facebook_url'     => 'nullable|url|max:255',
            'twitter_url'      => 'nullable|url|max:255',
            'instagram_url'    => 'nullable|url|max:255',
            'linkedin_url'     => 'nullable|url|max:255',
            'google_map_iframe'=> 'nullable|string',
        ]);

        $updateData = [
            'brand_name'       => $request->input('company_name'),
            'contact_email'    => $request->input('contact_email'),
            'contact_phone'    => $request->input('contact_phone'),
            'address'          => $request->input('contact_address'),
            'google_map_iframe'=> $request->input('google_map_iframe'),
            'social_links'     => [
                'facebook'  => $request->input('facebook_url'),
                'twitter'   => $request->input('twitter_url'),
                'instagram' => $request->input('instagram_url'),
                'linkedin'  => $request->input('linkedin_url'),
            ],
        ];

        if ($request->hasFile('logo')) {
            $request->validate(['logo' => 'image|mimes:png,jpg,jpeg,svg|max:10240']);
            $file = $request->file('logo');
            $file->move(public_path('assets/images'), 'logo.png');
            $updateData['logo_path'] = 'assets/images/logo.png';
        }

        if ($request->hasFile('icon')) {
            $request->validate(['icon' => 'image|mimes:png|max:10240']);
            $file = $request->file('icon');
            $file->move(public_path('assets/images'), 'icon.png');
            $updateData['icon_path'] = 'assets/images/icon.png';
        }

        // Also update .env APP_NAME when brand name changes
        if ($request->input('company_name') !== $settings->brand_name) {
            $this->updateEnvValue('APP_NAME', '"' . $request->input('company_name') . '"');
        }

        $settings->update($updateData);

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }

    /**
     * Update a value in the .env file.
     */
    private function updateEnvValue(string $key, string $value): void
    {
        $envPath = base_path('.env');
        $content = file_get_contents($envPath);

        $pattern = "/^{$key}=.*/m";
        if (preg_match($pattern, $content)) {
            $content = preg_replace($pattern, "{$key}={$value}", $content);
        } else {
            $content .= "\n{$key}={$value}";
        }

        file_put_contents($envPath, $content);
    }
}

