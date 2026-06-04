<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        Setting::create([
            'brand_name' => 'Venture Builders',
            'social_links' => [
                'facebook' => 'https://facebook.com',
                'twitter' => 'https://twitter.com',
                'instagram' => 'https://instagram.com',
                'linkedin' => 'https://linkedin.com',
            ],
            'footer_text' => 'We design, build, and deliver dream apartments, premium plots, and family flats with high standards of architecture, safety, and modern comfort.',
            'contact_email' => 'info@venturebuilders.com',
            'contact_phone' => '+001 325 589',
            'address' => '123 Venture Tower, Park Avenue Road, Manhattan, NY 10001',
            'google_map_iframe' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9739.626181446683!2d90.25991358451508!3d23.881189899665845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e998af65bee5%3A0x51e41cefc20b8fa8!2sJahangirnagar%20University%2C%20Savar!5e0!3m2!1sen!2sbd!4v1780572695912!5m2!1sen!2sbd',
            'logo_path' => 'assets/images/logo.png',
            'icon_path' => 'assets/images/icon.png',
        ]);
    }
}
