<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContactForm extends Model
{
    protected $fillable = [
        'email',
        'reason',
        'phone',
        'company',
        'content',
        'answered'
    ];
}
