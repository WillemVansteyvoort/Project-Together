<?php

namespace App\Http\Controllers\Application;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;
use App\Company;
use Auth;
class DashboardController extends Controller
{

    public function index($company) {
        return view('application.dashboard');
    }
}
