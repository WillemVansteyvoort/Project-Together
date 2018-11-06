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
        'email',
        'password',
        'avatar',
        'provider',
        'provider_id',
        'owner',
        'termsOfService',
        'privacyPolicy',
        'newsletter',
        'safety',
        'hide_data',
        'last_activity',
        'function',
        'company_id'
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

        return $this->belongsTo('App\City', 'user_id', 'city_id');

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

}
