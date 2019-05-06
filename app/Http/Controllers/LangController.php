<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LangController extends Controller
{

    public function __construct()
    {
        $this->middleware('lang');

    }

    public function set($lang) {
        App::setLocale($lang);
        session()->put('lang', $lang);
        return back();
    }
}

