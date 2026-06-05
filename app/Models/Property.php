<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'type',
        'description',
        'price',
        'location',
        'beds',
        'baths',
        'sqft',
        'image_path',
        'images',
        'featured',
        'status',
        'features',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'features' => 'array',
        'images' => 'array',
        'price' => 'decimal:2',
        'baths' => 'decimal:1',
    ];
}
