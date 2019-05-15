<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User_email extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'news',
        'user_id',
        'invites',
        'sessions',
        'notifications',
        'overview',

    ];
}
