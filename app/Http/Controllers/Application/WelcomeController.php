<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WelcomeController extends Controller
{
    public function index() {
        return view('application.welcome');
    }
}
