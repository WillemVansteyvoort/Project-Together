<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'users',
        'projects',
        'memory',
    ];



}
