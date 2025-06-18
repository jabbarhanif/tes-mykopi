<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Outlet extends Model
{
    //
    protected $fillable = [
        'id',
        'name',
        'location',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function promotions()
    {
        return $this->hasMany(Promotion::class);
    }
}
