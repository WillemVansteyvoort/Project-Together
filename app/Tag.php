<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'name',
        'taggable_id',
        'taggable_type',
        'project_id',
    ];


    public function taggable() {
        return $this->morphTo();
    }
}
