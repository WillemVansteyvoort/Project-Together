<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $with = ['tags'];
    protected $fillable = [
        'user_id',
        'project_id',
        'title',
        'content',
    ];

    public function tags() {
        return $this->morphMany('App\Tag', 'taggable');

    }

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function replies() {
        return $this->hasMany('App\Reply');
    }
}
