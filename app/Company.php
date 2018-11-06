<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Industry;
class Company extends Model
{
    protected $fillable = [

        'user_id',
        'name',
        'url',
        'industry_id',
        'content',
        'logo',
        'plan'
    ];


    public function users() {
        return $this->hasMany('App\User');
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

}
