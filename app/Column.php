<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    protected $fillable = [
      'name',
      'project_id',
      'position',
    ];

    public function items() {
        return $this->hasMany('App\BoardItem');
    }
}
