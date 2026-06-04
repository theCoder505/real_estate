<?php

namespace Database\Seeders;

use App\Models\Property;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        $properties = [
            [
                'title' => 'Colorful Little Apartment',
                'type' => 'apartment',
                'price' => 35000,
                'location' => 'Manhattan, New York',
                'description' => 'A cozy, vibrant apartment located in the heart of Manhattan. Perfect for young professionals or couples looking for a stylish urban space. Featuring modern finishes, large windows with city views, and open-concept living.',
                'beds' => 2,
                'baths' => 2,
                'sqft' => 920,
                'image_path' => 'https://preview.colorlib.com/theme/hus/img/appertment/1.png',
                'featured' => true,
                'features' => ['Central Heating', '24/7 Security', 'Gym Access', 'High-speed Wi-Fi', 'Dishwasher', 'Balcony'],
                'status' => 'For Sale'
            ],
            [
                'title' => 'Luxury Oceanview Penthouse',
                'type' => 'apartment',
                'price' => 1250000,
                'location' => 'Miami Beach, Florida',
                'description' => 'Experience the pinnacle of coastal luxury in this breathtaking Miami Beach penthouse. Boasting panoramic Atlantic ocean views, custom high-end furniture, private elevator access, and an expansive wraparound terrace.',
                'beds' => 4,
                'baths' => 4.5,
                'sqft' => 3450,
                'image_path' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
                'featured' => true,
                'features' => ['Private Pool', 'Ocean View', 'Wraparound Terrace', 'Concierge Service', 'Private Elevator', 'Smart Home System', 'Wine Cellar'],
                'status' => 'For Sale'
            ],
            [
                'title' => 'Modern Family Flat',
                'type' => 'flat',
                'price' => 220000,
                'location' => 'Chicago, Illinois',
                'description' => 'This spacious and modern flat is situated in a family-friendly neighborhood. With excellent transport links and top-rated schools nearby, it offers a perfect combination of suburban peace and urban accessibility.',
                'beds' => 3,
                'baths' => 2,
                'sqft' => 1450,
                'image_path' => 'https://preview.colorlib.com/theme/hus/img/appertment/2.png',
                'featured' => true,
                'features' => ['Kid-Friendly Park', 'Garage Parking', 'Hardwood Floors', 'Walk-in Closet', 'Storage Room', 'Central AC'],
                'status' => 'For Sale'
            ],
            [
                'title' => 'Prime Residential Land Plot',
                'type' => 'plot',
                'price' => 95000,
                'location' => 'Austin, Texas',
                'description' => 'An exceptional plot of land ready for development in a fast-growing Austin suburb. Fully cleared and prepared, with utilities pre-connected. Build your dream house or investment property in a high-demand sector.',
                'beds' => 0,
                'baths' => 0,
                'sqft' => 7500,
                'image_path' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
                'featured' => false,
                'features' => ['Utilities Connected', 'Paved Road Access', 'Corner Lot', 'Quiet Neighborhood', 'Ready to Build'],
                'status' => 'For Sale'
            ],
            [
                'title' => 'Charming Downtown Studio Flat',
                'type' => 'flat',
                'price' => 150000,
                'location' => 'Seattle, Washington',
                'description' => 'A beautifully designed studio flat maximizing space and light. Located steps away from coffee shops, bookstores, and downtown tech offices. Ideal for minimalist living or an investment property.',
                'beds' => 1,
                'baths' => 1,
                'sqft' => 580,
                'image_path' => 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80',
                'featured' => false,
                'features' => ['Rooftop Terrace', 'Laundry Facilities', 'Bike Storage', 'Keyless Entry', 'Pet Friendly'],
                'status' => 'For Sale'
            ],
            [
                'title' => 'Scenic Mountain View Plot',
                'type' => 'plot',
                'price' => 180000,
                'location' => 'Denver, Colorado',
                'description' => 'A stunning hillside plot offering unobstructed panoramic views of the Rocky Mountains. Perfect for building a premium vacation home or permanent residence. Secluded yet within 30 minutes of Denver.',
                'beds' => 0,
                'baths' => 0,
                'sqft' => 12000,
                'image_path' => 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
                'featured' => false,
                'features' => ['Mountain Views', 'Natural Spring', 'Permit Ready', 'Equestrian Allowed', 'Off-grid Potential'],
                'status' => 'For Sale'
            ],
        ];

        foreach ($properties as $property) {
            $property['slug'] = Str::slug($property['title']);
            Property::create($property);
        }
    }
}
