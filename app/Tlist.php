<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class Tlist extends Model
{
    protected $fillable = [
      'name',
      'type',
        'project_id'
    ];
    protected $with = ['tasks'];

    public function tasks() {
        return $this->hasMany("App\Task")->orderBy("status", "ASC");
    }

    public function shortTasks() {
        return $this->hasMany("App\Task")->orderBy("status", "ASC")->where('end_date', '>', Carbon::today());
    }
}
