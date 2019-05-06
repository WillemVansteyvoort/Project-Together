<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Yadahan\AuthenticationLog\AuthenticationLogable;

class User extends Authenticatable
{
    use Notifiable, AuthenticationLogable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'name',
        'lastname',
        'created_at',
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

    public static function boot() {
        parent::boot();

        static::deleting(function($user) { // before delete() method call this
            $user->rights()->delete();
            $user->two_step()->delete();
            $user->mails()->delete();
            $user->events()->delete();
            $user->activities()->delete();

        });
    }
    public function city() {
        return $this->belongsTo('App\City');
    }
    public function company() {

        return $this->belongsTo('App\Company');
    }
    public function limitProjects() {
        return $this->belongsToMany('App\Project')->limit(3);
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
    public function limitEvents() {
        return $this->hasMany('App\Event')->limit(4);
    }
    public function events() {
        return $this->hasMany('App\Event');
    }
    public function activities() {
        return $this->hasMany('App\Activity');
    }
}
