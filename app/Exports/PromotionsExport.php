<?php

namespace App\Exports;

use App\Models\Promotion;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class PromotionsExport implements FromView
{
    public $filters;

    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    public function view(): View
    {
        $query = Promotion::with(['outlet', 'user']);

        if ($this->filters['outlet_id'] ?? null) {
            $query->where('outlet_id', $this->filters['outlet_id']);
        }

        if ($this->filters['start_date'] ?? null) {
            $query->whereDate('promo_date', '>=', $this->filters['start_date']);
        }

        if ($this->filters['end_date'] ?? null) {
            $query->whereDate('promo_date', '<=', $this->filters['end_date']);
        }

        return view('exports.promotions', [
            'promotions' => $query->get()
        ]);
    }
}
