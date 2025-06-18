<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use App\Models\PromotionPhoto;
use App\Models\Outlet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

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

    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Promotion::with('photos')
            ->where('user_id', $user->id);

        if ($request->filled('start_date')) {
            $query->whereDate('promo_date', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('promo_date', '<=', $request->end_date);
        }

        $promotions = $query->latest()->get();

        return inertia('Promotions/Index', [
            'promotions' => $promotions,
            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ],
        ]);
    }

    public function adminIndex(Request $request)
    {
        $user = Auth::user();
        if ($user->role !== 'marketing') {
            abort(403);
        }

        $query = Promotion::with(['photos', 'user', 'outlet']);

        if ($request->filled('outlet_id')) {
            $query->where('outlet_id', $request->outlet_id);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('promo_date', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('promo_date', '<=', $request->end_date);
        }

        $promotions = $query->latest()->get();

        return inertia('Promotions/AdminIndex', [
            'promotions' => $promotions,
            'outlets' => Outlet::all(['id', 'name']),
            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'outlet_id' => $request->outlet_id,
            ],
        ]);
    }
    public function adminUpdate(Request $request, Promotion $promotion)
    {
        if (Auth::user()->role !== 'marketing') {
            abort(403);
        }

        $data = $request->validate([
            'status' => 'required|in:pending,reviewed,approved',
            'admin_note' => 'nullable|string',
        ]);

        $promotion->update($data);

        return back()->with('success', 'Laporan diperbarui.');
    }


    public function dashboard()
    {
        $user = Auth::user();
        if ($user->role !== 'marketing') {
            abort(403);
        }

        // Total laporan
        $totalReports = Promotion::count();

        // Laporan per outlet
        $reportsPerOutlet = DB::table('promotions')
            ->join('outlets', 'promotions.outlet_id', '=', 'outlets.id')
            ->select('outlets.name as outlet', DB::raw('count(*) as total'))
            ->groupBy('outlet')
            ->get();

        // Laporan per hari (7 hari terakhir)
        $dailyReports = DB::table('promotions')
            ->select(DB::raw('DATE(promo_date) as date'), DB::raw('count(*) as total'))
            ->where('promo_date', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Jenis promo paling populer
        $promoTypes = DB::table('promotions')
            ->select('promo_type', DB::raw('count(*) as total'))
            ->groupBy('promo_type')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        return inertia('Admin/Dashboard', [
            'totalReports' => $totalReports,
            'reportsPerOutlet' => $reportsPerOutlet,
            'dailyReports' => $dailyReports,
            'promoTypes' => $promoTypes,
        ]);
    }
}
