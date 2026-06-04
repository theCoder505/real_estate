<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Support\Facades\Cache;

class InjectSettings
{
    public function handle(Request $request, Closure $next)
    {
        // Cache settings for 24 hours to avoid DB queries on every request
        $settings = Cache::remember('site_settings', 60 * 60 * 24, function () {
            return Setting::first();
        });

        Inertia::share([
            'settings' => $settings,
        ]);

        return $next($request);
    }
}
