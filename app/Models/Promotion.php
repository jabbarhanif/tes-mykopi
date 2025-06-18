<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    //
    protected $fillable = [
        'user_id',
        'outlet_id',
        'promo_type',
        'description',
        'promo_date',
        'estimated_traffic',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function outlet()
    {
        return $this->belongsTo(Outlet::class);
    }

    public function photos()
    {
        return $this->hasMany(PromotionPhoto::class);
    }
}
