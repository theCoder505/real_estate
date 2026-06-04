<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicPageController extends Controller
{
    // Mock property database
    private function getProperties()
    {
        return [
            [
                'id' => 1,
                'title' => 'Colorful Little Apartment',
                'type' => 'apartment',
                'price' => 35000,
                'location' => 'Manhattan, New York',
                'description' => 'A cozy, vibrant apartment located in the heart of Manhattan. Perfect for young professionals or couples looking for a stylish urban space. Featuring modern finishes, large windows with city views, and open-concept living.',
                'beds' => 2,
                'baths' => 2,
                'sqft' => 920,
                'image' => 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
                'featured' => true,
                'features' => ['Central Heating', '24/7 Security', 'Gym Access', 'High-speed Wi-Fi', 'Dishwasher', 'Balcony'],
                'status' => 'For Sale'
            ],
            [
                'id' => 2,
                'title' => 'Luxury Oceanview Penthouse',
                'type' => 'apartment',
                'price' => 1250000,
                'location' => 'Miami Beach, Florida',
                'description' => 'Experience the pinnacle of coastal luxury in this breathtaking Miami Beach penthouse. Boasting panoramic Atlantic ocean views, custom high-end furniture, private elevator access, and an expansive wraparound terrace.',
                'beds' => 4,
                'baths' => 4.5,
                'sqft' => 3450,
                'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
                'featured' => true,
                'features' => ['Private Pool', 'Ocean View', 'Wraparound Terrace', 'Concierge Service', 'Private Elevator', 'Smart Home System', 'Wine Cellar'],
                'status' => 'For Sale'
            ],
            [
                'id' => 3,
                'title' => 'Modern Family Flat',
                'type' => 'flat',
                'price' => 220000,
                'location' => 'Chicago, Illinois',
                'description' => 'This spacious and modern flat is situated in a family-friendly neighborhood. With excellent transport links and top-rated schools nearby, it offers a perfect combination of suburban peace and urban accessibility.',
                'beds' => 3,
                'baths' => 2,
                'sqft' => 1450,
                'image' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
                'featured' => true,
                'features' => ['Kid-Friendly Park', 'Garage Parking', 'Hardwood Floors', 'Walk-in Closet', 'Storage Room', 'Central AC'],
                'status' => 'For Sale'
            ],
            [
                'id' => 4,
                'title' => 'Prime Residential Land Plot',
                'type' => 'plot',
                'price' => 95000,
                'location' => 'Austin, Texas',
                'description' => 'An exceptional plot of land ready for development in a fast-growing Austin suburb. Fully cleared and prepared, with utilities pre-connected. Build your dream house or investment property in a high-demand sector.',
                'beds' => 0,
                'baths' => 0,
                'sqft' => 7500,
                'image' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
                'featured' => false,
                'features' => ['Utilities Connected', 'Paved Road Access', 'Corner Lot', 'Quiet Neighborhood', 'Ready to Build'],
                'status' => 'For Sale'
            ],
            [
                'id' => 5,
                'title' => 'Charming Downtown Studio Flat',
                'type' => 'flat',
                'price' => 150000,
                'location' => 'Seattle, Washington',
                'description' => 'A beautifully designed studio flat maximizing space and light. Located steps away from coffee shops, bookstores, and downtown tech offices. Ideal for minimalist living or an investment property.',
                'beds' => 1,
                'baths' => 1,
                'sqft' => 580,
                'image' => 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80',
                'featured' => false,
                'features' => ['Rooftop Terrace', 'Laundry Facilities', 'Bike Storage', 'Keyless Entry', 'Pet Friendly'],
                'status' => 'For Sale'
            ],
            [
                'id' => 6,
                'title' => 'Scenic Mountain View Plot',
                'type' => 'plot',
                'price' => 180000,
                'location' => 'Denver, Colorado',
                'description' => 'A stunning hillside plot offering unobstructed panoramic views of the Rocky Mountains. Perfect for building a premium vacation home or permanent residence. Secluded yet within 30 minutes of Denver.',
                'beds' => 0,
                'baths' => 0,
                'sqft' => 12000,
                'image' => 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
                'featured' => false,
                'features' => ['Mountain Views', 'Natural Spring', 'Permit Ready', 'Equestrian Allowed', 'Off-grid Potential'],
                'status' => 'For Sale'
            ],
        ];
    }

    // Mock blog database
    private function getBlogPosts()
    {
        return [
            [
                'id' => 1,
                'title' => '5 Tips for First-Time Home Buyers',
                'category' => 'Tips & Advice',
                'author' => 'Sarah Jenkins',
                'date' => '2026-05-24',
                'excerpt' => 'Navigating the real estate market for the first time can be overwhelming. Here are 5 essential tips to prepare you for the buying journey.',
                'content' => 'Buying your first home is a monumental milestone, but it also comes with a steep learning curve. From understanding interest rates to inspect properties, it’s easy to make costly mistakes. First, define your budget strictly and secure mortgage pre-approval before looking. Second, consider the hidden costs of ownership like property taxes, maintenance, and insurance. Third, focus on the location rather than just the house cosmetics, as you can renovate the home but not change the neighborhood. Fourth, work with a trusted, dedicated buyer agent. Lastly, never skip a professional home inspection to ensure you aren’t buying hidden structural defects.',
                'image' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'id' => 2,
                'title' => 'Why Smart Homes are the Future of Living',
                'category' => 'Technology',
                'author' => 'David Miller',
                'date' => '2026-05-18',
                'excerpt' => 'Smart integration is no longer a luxury—it’s becoming the standard. Discover how automation adds long-term value to modern apartments.',
                'content' => 'The concept of home is undergoing a massive transformation, driven by technology. A modern smart home integrates lighting, heating, security, and entertainment systems into a cohesive, automated network. Key benefits include energy efficiency—smart thermostats and lighting reduce power bills by adapting to your lifestyle. Security is enhanced through real-time notifications, smart locks, and HD cameras that are accessible from anywhere. Finally, convenience and customization make daily life smoother, and properties with integrated smart features command significantly higher resale values.',
                'image' => 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'id' => 3,
                'title' => 'Understanding the Real Estate Market in 2026',
                'category' => 'Market Trends',
                'author' => 'Margaret Lawson',
                'date' => '2026-04-12',
                'excerpt' => 'An in-depth look at current trends in property pricing, demand fluctuations, and what to expect in the coming quarters.',
                'content' => 'The real estate market in 2026 is experiencing unique shifts driven by stabilization of interest rates, remote work flexibility, and a high demand for energy-efficient green building designs. Homebuyers are prioritizing properties with dedicated office spaces, energy-independent utilities (like solar integration), and proximity to suburban hubs rather than dense city centers. Supply constraints remain a key driver of price growth in metropolitan suburbs. Buyers should act decisively, while sellers can maximize value by focusing on minor upgrades and tech installations.',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
            ],
        ];
    }

    public function home()
    {
        $allProperties = $this->getProperties();
        $featured = array_values(array_filter($allProperties, function ($p) {
            return $p['featured'] === true;
        }));

        $latestNews = array_slice($this->getBlogPosts(), 0, 2);

        return Inertia::render('home', [
            'featuredProperties' => $featured,
            'latestNews' => $latestNews,
            'stats' => [
                'experience' => 10,
                'buildings' => 120,
                'clients' => 500,
            ]
        ]);
    }

    public function about()
    {
        return Inertia::render('about', [
            'stats' => [
                'experience' => 10,
                'buildings' => 120,
                'clients' => 500,
                'agents' => 15
            ]
        ]);
    }

    public function facilities()
    {
        $facilitiesList = [
            [
                'id' => 1,
                'title' => 'Architectural Planning Stage',
                'description' => 'Every building starts with a comprehensive masterplan designed by award-winning architects, prioritizing sunlight, aesthetics, and spatial utility.',
                'icon' => 'sketch'
            ],
            [
                'id' => 2,
                'title' => 'Premium Construction Material',
                'description' => 'We use top-grade concrete, steel reinforcements, and high-quality insulation materials ensuring all buildings withstand tests of time and nature.',
                'icon' => 'hotel'
            ],
            [
                'id' => 3,
                'title' => 'Smart Home Automation',
                'description' => 'State-of-the-art home intelligence systems integrated into our apartments allowing voice and app control of lighting, security, and climate.',
                'icon' => 'headset'
            ],
            [
                'id' => 4,
                'title' => 'Prime & Sustainable Locations',
                'description' => 'Our development properties are situated in premium residential hubs featuring top-tier school proximity, transport access, and green parks.',
                'icon' => 'map-pin'
            ],
            [
                'id' => 5,
                'title' => 'Eco-Friendly Systems',
                'description' => 'Integrating solar water heating systems, energy-efficient fixtures, and rain harvesting utilities into all layouts to reduce operational costs.',
                'icon' => 'leaf'
            ],
            [
                'id' => 6,
                'title' => '24/7 Security & Maintenance',
                'description' => 'Complete peace of mind with continuous CCTV surveillance, controlled gate entry, intercom systems, and an on-call maintenance crew.',
                'icon' => 'shield'
            ]
        ];

        return Inertia::render('facilities', [
            'facilities' => $facilitiesList
        ]);
    }

    public function properties(Request $request)
    {
        $properties = $this->getProperties();

        // Filter by Search Query (Title or Location)
        if ($request->filled('search')) {
            $search = strtolower($request->input('search'));
            $properties = array_filter($properties, function ($p) use ($search) {
                return str_contains(strtolower($p['title']), $search) || str_contains(strtolower($p['location']), $search);
            });
        }

        // Filter by Type
        if ($request->filled('type') && $request->input('type') !== 'all') {
            $type = $request->input('type');
            $properties = array_filter($properties, function ($p) use ($type) {
                return $p['type'] === $type;
            });
        }

        // Filter by Max Price
        if ($request->filled('price_max')) {
            $priceMax = intval($request->input('price_max'));
            $properties = array_filter($properties, function ($p) use ($priceMax) {
                return $p['price'] <= $priceMax;
            });
        }

        return Inertia::render('properties/index', [
            'properties' => array_values($properties),
            'filters' => $request->only(['search', 'type', 'price_max'])
        ]);
    }

    public function propertyShow($id)
    {
        $properties = $this->getProperties();
        $property = collect($properties)->firstWhere('id', intval($id));

        if (!$property) {
            abort(404);
        }

        // Suggest related properties
        $related = collect($properties)
            ->filter(function ($p) use ($property) {
                return $p['id'] !== $property['id'] && ($p['type'] === $property['type']);
            })
            ->take(3)
            ->values()
            ->all();

        return Inertia::render('properties/show', [
            'property' => $property,
            'relatedProperties' => $related
        ]);
    }

    public function blog()
    {
        return Inertia::render('blog/index', [
            'posts' => $this->getBlogPosts()
        ]);
    }

    public function blogShow($id)
    {
        $posts = $this->getBlogPosts();
        $post = collect($posts)->firstWhere('id', intval($id));

        if (!$post) {
            abort(404);
        }

        // Suggest related posts
        $related = collect($posts)
            ->filter(function ($p) use ($post) {
                return $p['id'] !== $post['id'];
            })
            ->take(2)
            ->values()
            ->all();

        return Inertia::render('blog/show', [
            'post' => $post,
            'relatedPosts' => $related
        ]);
    }

    public function contact()
    {
        return Inertia::render('contact');
    }

    public function contactSubmit(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'message' => 'required|string|min:10',
        ]);

        // Simulating email dispatch or DB entry creation.
        // We will flash success details back:
        return redirect()->back()->with('success', 'Thank you! Your message has been sent successfully. Our team will contact you shortly.');
    }

    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255',
        ]);

        // Simulating newsletter list subscription:
        return redirect()->back()->with('success', 'Subscribed successfully! Thank you for joining our newsletter.');
    }

    public function privacy()
    {
        return Inertia::render('privacy');
    }

    public function terms()
    {
        return Inertia::render('terms');
    }
}
