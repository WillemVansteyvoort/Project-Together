<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Two_step extends Model
{
    protected $fillable = [
        'email', 'phone', 'user_id', 'active', 'code', 'enable_phone'
    ];

    public $timestamps = false;

}
