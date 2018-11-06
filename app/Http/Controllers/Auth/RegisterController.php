<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RegisterController extends Controller
{
    public function __construct() {
        $this->middleware('guest');
    }

    public function index() {
        return view('front.register');
    }
}
