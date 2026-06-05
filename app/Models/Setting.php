<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_name',
        'social_links',
        'footer_text',
        'contact_email',
        'contact_phone',
        'address',
        'google_map_iframe',
        'logo_path',
        'icon_path',
        'broker_name',
        'broker_image_path',
        'our_journey',
        'years_of_experience',
        'building_finished',
        'satisfied_clients',
        'expert_agents',
        'our_mission',
        'our_vision',
        'currency_code',
        'currency_symbol',
    ];

    protected $casts = [
        'social_links' => 'array',
    ];
}
