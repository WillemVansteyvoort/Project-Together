<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Password_reset extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'email',
        'company_id',
        'token',
        'created_at',
    ];
}
