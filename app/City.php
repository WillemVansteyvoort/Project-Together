<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = [
      'city', 'zipcode'
    ];
    protected $primaryKey = 'city_id';

    public function users() {
        return $this->hasMany('App\User', 'user_id', 'city_id');
    }

    public function country() {
        return $this->belongsTo('App\Country', 'city_id', 'country_id');
    }

}
