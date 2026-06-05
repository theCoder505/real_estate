<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- ======= Basic SEO ======= --}}
        <title inertia>{{ config('app.name', 'Venture Builders') }}</title>
        <meta name="description" content="Venture Builders – Bangladesh's trusted real estate company. Explore premium residential and commercial properties. Contact us for buying, selling, or renting.">
        <meta name="keywords" content="real estate Bangladesh, property for sale Bangladesh, apartments Dhaka, commercial property Bangladesh, Venture Builders, buy property Bangladesh">
        <meta name="author" content="Venture Builders">
        <meta name="robots" content="index, follow">
        <link rel="canonical" href="{{ url()->current() }}">

        {{-- ======= Open Graph (Facebook, WhatsApp, LinkedIn) ======= --}}
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="{{ config('app.name', 'Venture Builders') }}">
        <meta property="og:title" content="{{ config('app.name', 'Venture Builders') }} – Premium Real Estate in Bangladesh">
        <meta property="og:description" content="Explore premium residential and commercial properties across Bangladesh. Find your dream home or investment property with Venture Builders.">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ asset('assets/images/og-image.jpg') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="en_US">

        {{-- ======= Twitter / X Card ======= --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ config('app.name', 'Venture Builders') }} – Premium Real Estate in Bangladesh">
        <meta name="twitter:description" content="Explore premium residential and commercial properties across Bangladesh. Find your dream home or investment property with Venture Builders.">
        <meta name="twitter:image" content="{{ asset('assets/images/og-image.jpg') }}">

        {{-- ======= Geo / Local SEO ======= --}}
        <meta name="geo.region" content="BD">
        <meta name="geo.placename" content="Dhaka, Bangladesh">
        <meta name="language" content="English">

        {{-- ======= Favicon ======= --}}
        <link rel="icon" type="image/png" href="/assets/images/icon.png">
        <link rel="apple-touch-icon" href="/assets/images/icon.png">

        {{-- ======= Fonts ======= --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead

        {{-- ======= Theme Script (no flash) ======= --}}
        <script>
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        </script>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>