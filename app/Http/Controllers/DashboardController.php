<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Promotion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; // <-- Tambahkan ini

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        if ($user->role === 'marketing') {
            // Data statistik untuk marketing
            $totalReports = Promotion::count();

            $reportsPerOutlet = DB::table('promotions')
                ->join('outlets', 'promotions.outlet_id', '=', 'outlets.id')
                ->select('outlets.name as outlet', DB::raw('count(*) as total'))
                ->groupBy('outlet')
                ->get();

            $dailyReports = DB::table('promotions')
                ->select(DB::raw('DATE(promo_date) as date'), DB::raw('count(*) as total'))
                ->where('promo_date', '>=', now()->subDays(7))
                ->groupBy('date')
                ->orderBy('date')
                ->get();

            $promoTypes = DB::table('promotions')
                ->select('promo_type', DB::raw('count(*) as total'))
                ->groupBy('promo_type')
                ->orderByDesc('total')
                ->limit(5)
                ->get();

            return inertia('Dashboard', [
                'auth' => [
                    'user' => $user,
                ],
                'totalReports' => $totalReports,
                'reportsPerOutlet' => $reportsPerOutlet,
                'dailyReports' => $dailyReports,
                'promoTypes' => $promoTypes,
            ]);
        }

        // Jika bukan marketing, tampilkan dashboard biasa
        return inertia('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
        ]);
    }
}
