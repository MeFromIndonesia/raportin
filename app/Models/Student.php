<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'nisn',
        'name',
        'place_of_birth',
        'date_of_birth',
    ];

    public function StudentClass()
    {
        return $this->belongsTo(StudentClass::class);
    }
}
