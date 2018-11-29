<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\User;
class UpdateActivity extends Controller
{
    public function update() {

        $user =  Auth::user();

        $user->last_activity = now();
        $user->save();
    }
}
