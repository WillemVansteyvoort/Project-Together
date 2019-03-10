<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CrisisItem extends Model
{
    protected $fillable = [
        'project_id',
        'user_id',
        'name',
        'description',
        'priority',
        'solved',
        'solvedTime',
    ];

    public function user() {
        return $this->belongsTo('App\User');
    }
}
