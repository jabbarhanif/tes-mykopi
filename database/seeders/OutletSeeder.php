<?php

namespace Database\Seeders;

use App\Models\Outlet;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class OutletSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $outlet = Outlet::create([
            'name' => 'Outlet Surabaya Tunjungan',
            'location' => 'Surabaya, Jawa Timur',
        ]);

        User::create([
            'name' => 'Outlet Surabaya',
            'email' => 'surabaya@kopio.com',
            'password' => Hash::make('password'),
            'role' => 'outlet',
            'outlet_id' => $outlet->id,
        ]);

        User::create([
            'name' => 'Marketing Admin',
            'email' => 'marketing@kopio.com',
            'password' => Hash::make('password'),
            'role' => 'marketing',
        ]);
    }
}
