<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{

    protected $fillable = [
      'company_id',
      'name',
      'description',
        'url',
        'end_date',
        'user_id',
        'public',
        'tasks',
        'notes',
        'forum',
        'presences',
        'polls',
        'activities',
        'crisiscenter',
        'logs',
        'status',
    ];

    public function users() {

        return $this->belongsToMany('App\User')->withPivot('role');
    }


    public function tags() {
        return $this->morphMany('App\Tag', 'taggable');
    }

    public function notes() {
        return $this->hasMany('App\Note');
    }

    public function posts() {
        return $this->hasMany('App\Post');
    }

}
