<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
      'company_id',
      'user_id',
      'private',
      'title',
        'description',
        'from',
        'from_hour',
        'until',
        'until_hour',
        'color'
    ];
}
