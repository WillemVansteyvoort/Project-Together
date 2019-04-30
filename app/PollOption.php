<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PollOption extends Model
{
    protected $fillable = [
      'content',
        'poll_id',
        'user_id',
    ];

    public function votes() {
        return $this->hasMany('App\PollVote');
    }
}
