<?php

use App\Models\Admin;

test('guests are redirected to the login page', function () {
    $this->get('/admin/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = Admin::factory()->create());

    $this->get('/admin/dashboard')->assertOk();
});