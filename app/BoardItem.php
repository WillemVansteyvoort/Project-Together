<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BoardItem extends Model
{

    protected $with = ['column', 'user'];
    protected $fillable = [
        'name',
        'description',
        'project_id',
        'user_id',
        'column_id',
        'color',
        'duration',
    ];

    public function column() {
        return $this->belongsTo('App\Column');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }
}
