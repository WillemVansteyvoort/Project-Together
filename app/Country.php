<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = [
      'country'
    ];

    protected $primaryKey = 'country_id';

    public function cities() {
        return $this->hasMany('App\City', 'city_id', 'country_id');
    }

}
