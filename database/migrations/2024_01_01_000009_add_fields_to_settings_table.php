<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->string('broker_name')->nullable();
            $table->string('broker_image_path')->nullable();
            $table->text('our_journey')->nullable();
            $table->integer('years_of_experience')->nullable();
            $table->integer('building_finished')->nullable();
            $table->integer('satisfied_clients')->nullable();
            $table->integer('expert_agents')->nullable();
            $table->text('our_mission')->nullable();
            $table->text('our_vision')->nullable();
            $table->string('currency_code')->nullable()->default('USD');
            $table->string('currency_symbol')->nullable()->default('$');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn([
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
            ]);
        });
    }
};
