<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Industry;
class Company extends Model
{
    protected $fillable = [

        'user_id',
        'plan_id',
        'name',
        'url',
        'industry_id',
        'content',
        'message',
        'logo',
        'plan'
    ];


    public function users() {
        return $this->hasMany('App\User');
    }
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    public function industry() {
        return $this->belongsTo('App\Industry');
    }

    public function invites() {
        return $this->hasMany('App\User_invite');
    }

    public function groups() {
        return $this->hasMany('App\Group');
    }

    public function projects() {
        return $this->hasMany('App\Project');
    }

    public function plan() {
        return $this->belongsTo('App\Plan');
    }


}
