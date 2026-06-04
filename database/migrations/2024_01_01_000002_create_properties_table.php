<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('type')->default('apartment'); // apartment, flat, plot
            $table->text('description')->nullable();
            $table->decimal('price', 15, 2)->default(0);
            $table->string('location')->nullable();
            $table->integer('beds')->default(0);
            $table->decimal('baths', 4, 1)->default(0);
            $table->integer('sqft')->default(0);
            $table->string('image_path')->nullable();
            $table->boolean('featured')->default(false);
            $table->string('status')->default('For Sale'); // For Sale, For Rent, Sold
            $table->json('features')->nullable(); // array of feature strings
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
