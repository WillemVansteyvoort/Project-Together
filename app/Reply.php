<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $with = ['user', 'post'];
    protected $fillable = [
      'post_id',
      'user_id',
        'content',
        'created',
        'project_id',
    ];

    public function post()
    {
        return $this->belongsTo('App\Post');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }
}
