<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PromotionController;
use \Illuminate\Http\Request;
use App\Exports\PromotionsExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Auth; // <-- Tambahkan ini

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/promotions', [PromotionController::class, 'index'])->name('promotions.index');
    Route::get('/promotions/create', [PromotionController::class, 'create'])->name('promotions.create');
    Route::post('/promotions', [PromotionController::class, 'store'])->name('promotions.store');
});
Route::middleware(['auth'])->group(function () {
    // halaman untuk role marketing
    Route::get('/admin/promotions', [PromotionController::class, 'adminIndex'])
        ->name('admin.promotions.index');
});

Route::put('/admin/promotions/{promotion}', [PromotionController::class, 'adminUpdate'])
    ->middleware('auth')
    ->name('admin.promotions.update');

Route::get('/admin/dashboard', [PromotionController::class, 'dashboard'])
    ->middleware('auth')
    ->name('admin.dashboard');


Route::get('/admin/promotions/export', function (Request $request) {
    if (Auth::user()->role !== 'marketing') abort(403);

    $filters = $request->only(['outlet_id', 'start_date', 'end_date']);
    return Excel::download(new PromotionsExport($filters), 'laporan_promosi.xlsx');
})->name('admin.promotions.export');

Route::delete('/promotions/{promotion}', [PromotionController::class, 'destroy'])
    ->middleware('auth')
    ->name('promotions.destroy');

require __DIR__ . '/auth.php';
