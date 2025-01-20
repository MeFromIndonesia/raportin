<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use App\Http\Resources\StudentClassResource;
use App\Models\StudentClass;
use Illuminate\Support\Facades\Route;
use Tighten\Ziggy\Ziggy;

Route::middleware(['auth'])->group(function () {
    Route::get('api/users', [UserController::class, 'apiList'])->name('data.users');

    Route::get('api/students', [StudentController::class, 'apiList'])->name('data.students');

    Route::get('api/students/classes', function () {
        $query = StudentClass::query();

        $studentClass = $query->get();

        return StudentClassResource::collection($studentClass);
    })->name('data.studentclass');
});
