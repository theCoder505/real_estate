<?php

namespace Database\Seeders;

use App\Models\Facility;
use Illuminate\Database\Seeder;

class FacilitySeeder extends Seeder
{
    public function run(): void
    {
        $facilities = [
            [
                'title' => 'Architectural Planning Stage',
                'description' => 'Every building starts with a comprehensive masterplan designed by award-winning architects, prioritizing sunlight, aesthetics, and spatial utility.',
                'icon' => 'sketch'
            ],
            [
                'title' => 'Premium Construction Material',
                'description' => 'We use top-grade concrete, steel reinforcements, and high-quality insulation materials ensuring all buildings withstand tests of time and nature.',
                'icon' => 'hotel'
            ],
            [
                'title' => 'Smart Home Automation',
                'description' => 'State-of-the-art home intelligence systems integrated into our apartments allowing voice and app control of lighting, security, and climate.',
                'icon' => 'headset'
            ],
            [
                'title' => 'Prime & Sustainable Locations',
                'description' => 'Our development properties are situated in premium residential hubs featuring top-tier school proximity, transport access, and green parks.',
                'icon' => 'map-pin'
            ],
            [
                'title' => 'Eco-Friendly Systems',
                'description' => 'Integrating solar water heating systems, energy-efficient fixtures, and rain harvesting utilities into all layouts to reduce operational costs.',
                'icon' => 'leaf'
            ],
            [
                'title' => '24/7 Security & Maintenance',
                'description' => 'Complete peace of mind with continuous CCTV surveillance, controlled gate entry, intercom systems, and an on-call maintenance crew.',
                'icon' => 'shield'
            ]
        ];

        foreach ($facilities as $facility) {
            Facility::create($facility);
        }
    }
}
