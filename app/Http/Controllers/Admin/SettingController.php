<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

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
            // New fields
            'broker_name'      => $settings->broker_name,
            'broker_image_path'=> $settings->broker_image_path,
            'our_journey'      => $settings->our_journey,
            'years_of_experience'=> $settings->years_of_experience,
            'building_finished'=> $settings->building_finished,
            'satisfied_clients'=> $settings->satisfied_clients,
            'expert_agents'    => $settings->expert_agents,
            'our_mission'      => $settings->our_mission,
            'our_vision'       => $settings->our_vision,
            'currency_code'    => $settings->currency_code ?? 'USD',
            'currency_symbol'  => $settings->currency_symbol ?? '$',
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
            // New validations
            'broker_name'      => 'nullable|string|max:255',
            'our_journey'      => 'nullable|string',
            'years_of_experience'=> 'nullable|integer|min:0',
            'building_finished'=> 'nullable|integer|min:0',
            'satisfied_clients'=> 'nullable|integer|min:0',
            'expert_agents'    => 'nullable|integer|min:0',
            'our_mission'      => 'nullable|string',
            'our_vision'       => 'nullable|string',
            'currency_code'    => 'nullable|string|max:10',
            'currency_symbol'  => 'nullable|string|max:10',
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
            // New mappings
            'broker_name'      => $request->input('broker_name'),
            'our_journey'      => $request->input('our_journey'),
            'years_of_experience'=> $request->input('years_of_experience'),
            'building_finished'=> $request->input('building_finished'),
            'satisfied_clients'=> $request->input('satisfied_clients'),
            'expert_agents'    => $request->input('expert_agents'),
            'our_mission'      => $request->input('our_mission'),
            'our_vision'       => $request->input('our_vision'),
            'currency_code'    => $request->input('currency_code', 'USD'),
            'currency_symbol'  => $request->input('currency_symbol', '$'),
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

        // Handle broker image upload
        if ($request->hasFile('broker_image')) {
            $request->validate(['broker_image' => 'image|mimes:png,jpg,jpeg,svg|max:10240']);
            if ($settings->broker_image_path) {
                $oldPath = public_path($settings->broker_image_path);
                if (file_exists($oldPath) && is_file($oldPath)) {
                    @unlink($oldPath);
                }
            }
            $file = $request->file('broker_image');
            $filename = 'broker_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('assets/images'), $filename);
            $updateData['broker_image_path'] = 'assets/images/' . $filename;
        }

        if ($request->input('remove_broker_image') == '1' || $request->input('remove_broker_image') === true) {
            if ($settings->broker_image_path) {
                $oldPath = public_path($settings->broker_image_path);
                if (file_exists($oldPath) && is_file($oldPath)) {
                    @unlink($oldPath);
                }
            }
            $updateData['broker_image_path'] = null;
        }

        // Also update .env APP_NAME when brand name changes
        if ($request->input('company_name') !== $settings->brand_name) {
            $this->updateEnvValue('APP_NAME', '"' . $request->input('company_name') . '"');
        }

        $settings->update($updateData);

        // Clear site_settings cache
        Cache::forget('site_settings');

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
