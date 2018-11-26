<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = [
      'name', 'zipcode', 'country_id'
    ];

    public $timestamps = false;

    public function users() {
        return $this->hasMany('App\User');
    }

    public function country() {
        return $this->belongsTo('App\Country');
    }

}
