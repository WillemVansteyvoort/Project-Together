<?php

namespace App\Http\Controllers\Application;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Company;
use App\Activity;
use Illuminate\Support\Facades\Auth;
class ActivityController extends Controller
{
    public function all() {
        return Activity::where('company_id', Auth::user()->company_id)->with('user', 'project')->orderBy('id', 'desc')->get();
    }
}
