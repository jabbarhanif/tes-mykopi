<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PromotionController;

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

require __DIR__ . '/auth.php';
