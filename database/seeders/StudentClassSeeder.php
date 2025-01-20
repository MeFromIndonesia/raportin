<?php

namespace Database\Seeders;

use App\Models\StudentClass;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grades = [10, 11, 12];
        $majors = [
            'Pengembangan Perangkat Lunak dan Gim',
            'Desain Komunikasi Visual',
            'Manajemen Perkantoran dan Layanan Bisnis',
            'Teknik dan Bisnis Sepeda Motor',
            'Bisnis Digital',
            'Akuntansi dan Keuangan Lembaga',
        ];

        foreach ($majors as $major) {
            foreach ($grades as $grade) {
                StudentClass::create([
                    'grade' => $grade,
                    'major' => $major,
                ]);
            }
        }
    }
}
