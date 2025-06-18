<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use App\Models\PromotionPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PromotionController extends Controller
{
    public function create()
    {
        return inertia('Promotions/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'promo_type'        => 'required|string|max:255',
            'description'       => 'nullable|string',
            'promo_date'        => 'required|date',
            'estimated_traffic' => 'nullable|integer|min:0',
            'photos.*'          => 'nullable|image|max:2048',
        ]);

        $user = Auth::user();

        $promotion = Promotion::create([
            'user_id'          => $user->id,
            'outlet_id'        => $user->outlet_id,
            'promo_type'       => $validated['promo_type'],
            'description'      => $validated['description'] ?? null,
            'promo_date'       => $validated['promo_date'],
            'estimated_traffic' => $validated['estimated_traffic'] ?? null,
            'status'           => 'pending',
        ]);

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('public/promotions');
                PromotionPhoto::create([
                    'promotion_id' => $promotion->id,
                    'path'         => Storage::url($path),
                ]);
            }
        }

        return redirect()->route('promotions.index')->with('success', 'Laporan promosi berhasil dikirim.');
    }

    public function index()
    {
        $user = Auth::user();

        $promotions = Promotion::with('photos')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return inertia('Promotions/Index', [
            'promotions' => $promotions,
        ]);
    }
}
