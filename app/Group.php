<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
    'company_id',
    'name',
    'content',
];

    public function company() {
        return $this->belongsTo('Company');
    }

}
