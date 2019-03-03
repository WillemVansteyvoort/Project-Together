<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'lastname',
        'username',
        'email',
        'password',
        'admin',
        'avatar',
        'provider',
        'provider_id',
        'owner',
        'termsOfService',
        'privacyPolicy',
        'online',
        'newsletter',
        'safety',
        'hide_data',
        'last_activity',
        'function',
        'company_id',
        'two_step',
        'notifications',
    ];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function city() {

        return $this->belongsTo('App\City');

    }

    public function company() {

        return $this->belongsTo('App\Company');
    }

    public function projects() {
        return $this->belongsToMany('App\Project');
    }

    public function notifcationsAll() {
        return $this->hasMany('App\Notification');
    }

    public function verify() {
        return $this->hasOne('App\User_verify');
    }

    public function two_step() {
        return $this->hasOne('App\Two_step');
    }

    public function rights() {
        return $this->hasOne('App\User_right');
    }
    public function mails() {
        return $this->hasOne('App\User_email');
    }
    public function groups() {
        return $this->belongsToMany('App\Group');
    }
    public function events() {
        return $this->hasMany('App\Event');
    }
    public function activities() {
        return $this->hasMany('App\Activity');
    }
}
