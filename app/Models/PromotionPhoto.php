<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromotionPhoto extends Model
{
    //

    public function promotion()
    {
        return $this->belongsTo(Promotion::class);
    }
}
