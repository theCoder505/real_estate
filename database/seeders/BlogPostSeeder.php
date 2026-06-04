<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => '5 Tips for First-Time Home Buyers',
                'category' => 'Tips & Advice',
                'author' => 'Sarah Jenkins',
                'published_at' => '2026-05-24 00:00:00',
                'excerpt' => 'Navigating the real estate market for the first time can be overwhelming. Here are 5 essential tips to prepare you for the buying journey.',
                'content' => 'Buying your first home is a monumental milestone, but it also comes with a steep learning curve. From understanding interest rates to inspect properties, it’s easy to make costly mistakes. First, define your budget strictly and secure mortgage pre-approval before looking. Second, consider the hidden costs of ownership like property taxes, maintenance, and insurance. Third, focus on the location rather than just the house cosmetics, as you can renovate the home but not change the neighborhood. Fourth, work with a trusted, dedicated buyer agent. Lastly, never skip a professional home inspection to ensure you aren’t buying hidden structural defects.',
                'image_path' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'title' => 'Why Smart Homes are the Future of Living',
                'category' => 'Technology',
                'author' => 'David Miller',
                'published_at' => '2026-05-18 00:00:00',
                'excerpt' => 'Smart integration is no longer a luxury—it’s becoming the standard. Discover how automation adds long-term value to modern apartments.',
                'content' => 'The concept of home is undergoing a massive transformation, driven by technology. A modern smart home integrates lighting, heating, security, and entertainment systems into a cohesive, automated network. Key benefits include energy efficiency—smart thermostats and lighting reduce power bills by adapting to your lifestyle. Security is enhanced through real-time notifications, smart locks, and HD cameras that are accessible from anywhere. Finally, convenience and customization make daily life smoother, and properties with integrated smart features command significantly higher resale values.',
                'image_path' => 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'title' => 'Understanding the Real Estate Market in 2026',
                'category' => 'Market Trends',
                'author' => 'Margaret Lawson',
                'published_at' => '2026-04-12 00:00:00',
                'excerpt' => 'An in-depth look at current trends in property pricing, demand fluctuations, and what to expect in the coming quarters.',
                'content' => 'The real estate market in 2026 is experiencing unique shifts driven by stabilization of interest rates, remote work flexibility, and a high demand for energy-efficient green building designs. Homebuyers are prioritizing properties with dedicated office spaces, energy-independent utilities (like solar integration), and proximity to suburban hubs rather than dense city centers. Supply constraints remain a key driver of price growth in metropolitan suburbs. Buyers should act decisively, while sellers can maximize value by focusing on minor upgrades and tech installations.',
                'image_path' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
            ],
        ];

        foreach ($posts as $post) {
            $post['slug'] = Str::slug($post['title']);
            BlogPost::create($post);
        }
    }
}
