<?php

namespace App\Http\Controllers\Application;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('user');
    }

    public function index($company, $profile) {
        $user = User::where('username', '=', $profile)->with('activities.project', 'activities.user', 'city', 'city.country', 'groups')->orderBy('id', 'desc')->get();
        return view('application.profile', compact('user'));
    }
}
