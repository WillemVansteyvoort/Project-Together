<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User_right extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'create_members',
        'create_groups',
        'create_projects',
        'company_settings',
        'upload_avatar',
        'change_online',
        'right_data',


    ];
}
