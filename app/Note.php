<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = [
        'name',
        'project_id',
        'user_id',
        'text',
        'private',
    ];


    public function user() {
        return $this->belongsTo('App\User');
    }
}
