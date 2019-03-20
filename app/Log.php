<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $fillable = [
      'user_id',
      'project_id',
      'content',
    ];

    public function user() {
        return $this->belongsTo("App\User");
    }

    public function project() {
        return $this->belongsTo("App\Project");
    }
}
