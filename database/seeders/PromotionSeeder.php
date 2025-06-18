<?php

namespace Database\Seeders;

use App\Models\Promotion;
use App\Models\PromotionPhoto;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('role', 'outlet')->first();

        for ($i = 1; $i <= 5; $i++) {
            $promo = Promotion::create([
                'user_id' => $user->id,
                'outlet_id' => $user->outlet_id,
                'promo_type' => 'Diskon ' . ($i * 5) . '%',
                'description' => 'Promo menarik ke-' . $i,
                'promo_date' => now()->subDays($i),
                'estimated_traffic' => rand(50, 200),
                'status' => 'pending',
            ]);

            PromotionPhoto::create([
                'promotion_id' => $promo->id,
                'path' => '/storage/dummy/foto' . $i . '.jpg', // kamu harus siapkan file dummy ini
            ]);
        }
    }
}
