<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    protected $fillable = [
        'title',
        'project_id',
        'content',
        'multiple',
        'change',
        'end_date',
    ];

    public function options() {
        return $this->hasMany('App\PollOption');
    }

    public function votes() {
        return $this->hasMany('App\PollVote');
    }
}
