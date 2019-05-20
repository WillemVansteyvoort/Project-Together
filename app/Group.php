<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
        'company_id',
        'name',
        'user_id',
        'description',
];

    public function company() {
        return $this->belongsTo('Company');
    }

    public function users() {
        return $this->belongsToMany('App\User');
    }

    public function owner() {
        return $this->belongsTo('App\User');
    }


}
