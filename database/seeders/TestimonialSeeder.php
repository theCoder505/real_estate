<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Michael & Sarah D.',
                'role' => 'Apartment Owners',
                'content' => 'Venture Builders made our first home buying experience incredibly smooth. The transparency in pricing and the quality of the finishing are unmatched in this area. We couldn\'t be happier with our new flat.',
                'image_path' => 'https://preview.colorlib.com/theme/hus/img/testmonial/author.png'
            ],
            [
                'name' => 'James Harrison',
                'role' => 'Real Estate Investor',
                'content' => 'I have purchased three properties through them over the last 5 years. Their properties appreciate faster than average because of the smart-home tech and sustainable design elements they incorporate.',
                'image_path' => 'https://preview.colorlib.com/theme/hus/img/testmonial/author2.png'
            ],
            [
                'name' => 'Dr. Elena Rossi',
                'role' => 'Plot Buyer',
                'content' => 'We bought a scenic plot in Colorado through their brokerage. The land title was perfectly clear, and their legal team handled everything. We are now building our dream retirement home.',
                'image_path' => 'https://preview.colorlib.com/theme/hus/img/testmonial/author.png'
            ]
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
