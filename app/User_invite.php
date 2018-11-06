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
    ];

    public function company() {

        return $this->belongsTo('App\Company');
    }

}
