<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::middleware(['guest'])->group(function () {
    Route::get('register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('register', [AuthController::class, 'create'])->name('auth.create');

    Route::get('login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('login', [AuthController::class, 'authenticate'])->name('auth.authenticate');
});

Route::middleware(['authenticated'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
});

Route::middleware(['authenticated'])->group(function () {
    Route::get('users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('users/{id}/edit', [UserController::class, 'update'])->name('users.update');

    Route::delete('users/{id}', [UserController::class, 'delete'])->name('users.delete');
});

Route::middleware(['authenticated'])->group(function () {
    Route::get('students/add', [StudentController::class, 'add'])->name('students.add');
    Route::post('students/add', [StudentController::class, 'create'])->name('students.create');

    Route::get('students/{id}/edit', [StudentController::class, 'edit'])->name('students.edit');
    Route::put('students/{id}/edit', [StudentController::class, 'update'])->name('students.update');

    Route::delete('students/{id}', [StudentController::class, 'delete'])->name('students.delete');
});

require __DIR__.'/api.php';
