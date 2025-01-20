<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function apiList()
    {
        $query = Student::query();

        $students = $query->with('StudentClass')->paginate(10);

        return StudentResource::collection($students);
    }

    public function add()
    {
        return Inertia::render('Students/Add');
    }

    public function create(Request $request)
    {
        $request->validate([
            'nisn' => 'required|numeric',
            'name' => 'required|string|max:100',
            'place_of_birth' => 'required|string|max:100',
            'date_of_birth' => 'required|date',
            'student_class_id' => 'required|numeric',
        ]);

        dd($request->all());
    }
}
