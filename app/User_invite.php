<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User_invite extends Model
{
    protected $fillable = [
      'company_id',
      'token',
      'email',
      'name',
      'admin',
        'end_date',
        'message',
        'user_id',
        'email',
        'name',
        'lastname',
        'username',
        'password',
        'owner',
        'admin',
        'street',
        'phone',
        'city_id',
        'biografy',
        'birthdate',
        'function',
        'create_members',
        'create_groups',
        'create_projects',
        'company_settings',
        'upload_avatar',
        'change_online',
        'groups',

    ];

    public function company() {
        return $this->belongsTo('App\Company');
    }

    public function creator() {
        return $this->belongsTo('App\User');
    }

}
