<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'type',
        'content',
        'created_at'
    ];

    public function User() {
        return $this->belongsTo('App\User');
    }

}
