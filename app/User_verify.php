<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User_verify extends Model
{
    protected $fillable = [
        'token',
        'user_id',
    ];

    public function user() {
        $this->belongsTo('App\User');
    }

}
