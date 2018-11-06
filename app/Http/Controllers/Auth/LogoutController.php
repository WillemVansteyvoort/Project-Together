<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class LogoutController extends Controller
{
    public function index() {
        $url = Auth::user()->company->url;
        Auth::logout();
        return redirect( $url . "/login");
    }
}
