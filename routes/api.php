<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Tighten\Ziggy\Ziggy;

Route::middleware(['auth'])->group(function () {
    Route::get('api/users', [UserController::class, 'index'])->name('data.users');
});
