<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Models\Student;
use App\Models\StudentClass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function apiList(Request $request)
    {
        $query = Student::query();

        if ($request->has('id')) {
            $ids = explode(',', $request->id);
            $query->whereIn('id', $ids);
        }

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
            'grade' => 'required|numeric|in:10,11,12',
            'major' => 'required|string|exists:student_classes,major',
        ]);

        $studentClass = StudentClass::where([
            ['grade', '=', $request->grade],
            ['major', '=', $request->major],
        ])->first();

        if (!$studentClass) {
            return back()->with('error', 'Kelas tidak ditemukan');
        }

        Student::create([
            'nisn' => $request->nisn,
            'name' => $request->name,
            'place_of_birth' => $request->place_of_birth,
            'date_of_birth' => $request->date_of_birth,
            'student_class_id' => $studentClass->id,
        ]);

        return redirect()->route('dashboard')->with('success', 'Data siswa telah dibuat');
    }

    public function edit(int $id)
    {
        return Inertia::render('Students/Edit', [
            'id' => $id,
        ]);
    }

    public function update(int $id, Request $request)
    {
        $request->validate([
            'nisn' => 'required|numeric',
            'name' => 'required|string|max:100',
            'place_of_birth' => 'required|string|max:100',
            'date_of_birth' => 'required|date',
            'grade' => 'required|numeric|in:10,11,12',
            'major' => 'required|string|exists:student_classes,major',
        ]);

        $studentClass = StudentClass::where([
            ['grade', '=', $request->grade],
            ['major', '=', $request->major],
        ])->first();

        if (!$studentClass) {
            return back()->with('error', 'Kelas tidak ditemukan');
        }

        $student = Student::findOrFail($id);
        $student->update([
            'nisn' => $request->nisn,
            'name' => $request->name,
            'place_of_birth' => $request->place_of_birth,
            'date_of_birth' => $request->date_of_birth,
            'student_class_id' => $studentClass->id,
        ]);

        return redirect()->route('dashboard')->with('success', 'Data siswa telah diperbarui');
    }

    public function delete(int $id)
    {
        Student::destroy($id);

        return redirect()->route('dashboard')->with('success', 'Data siswa telah dihapus');
    }
}
