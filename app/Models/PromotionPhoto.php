<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromotionPhoto extends Model
{
    //
    protected $fillable = ['promotion_id', 'path'];


    public function promotion()
    {
        return $this->belongsTo(Promotion::class);
    }
}
