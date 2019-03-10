<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
      'project_id',
      'company_id',
      'user_id',
      'type',
      'content',
    ];



    public function user() {
        return $this->belongsTo('App\User');
    }
    public function project() {
        return $this->belongsTo('App\Project');
    }
}
