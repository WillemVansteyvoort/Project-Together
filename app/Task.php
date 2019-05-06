<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
      'title',
      'description',
      'user_id',
        'tlist_id',
        'project_id',
        'company_id',
      'priority',
      'end_date',
      'timer',
      'status',
    ];
protected $with = ['user'];
    public function user() {
        return $this->belongsTo('App\User');
    }
}
