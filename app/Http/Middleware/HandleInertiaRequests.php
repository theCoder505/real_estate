<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Setting;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        // Load site settings once and share globally
        $siteSettings = Setting::first();
        $socialLinks = $siteSettings?->social_links ?? [];

        return array_merge(parent::share($request), [
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'settings' => $siteSettings ? [
                'company_name'     => $siteSettings->brand_name,
                'contact_email'    => $siteSettings->contact_email,
                'contact_phone'    => $siteSettings->contact_phone,
                'contact_address'  => $siteSettings->address,
                'footer_text'      => $siteSettings->footer_text,
                'google_map_iframe'=> $siteSettings->google_map_iframe,
                'logo_path'        => $siteSettings->logo_path,
                'icon_path'        => $siteSettings->icon_path,
                'facebook_url'     => $socialLinks['facebook'] ?? null,
                'twitter_url'      => $socialLinks['twitter'] ?? null,
                'instagram_url'    => $socialLinks['instagram'] ?? null,
                'linkedin_url'     => $socialLinks['linkedin'] ?? null,
            ] : null,
        ]);
    }
}
