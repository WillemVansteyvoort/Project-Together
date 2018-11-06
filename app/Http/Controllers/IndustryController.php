<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Industry;
class IndustryController extends Controller
{
    public function tojson () {
        $industries = Industry::all();


        return $industries->toJson(JSON_PRETTY_PRINT);
    }
}
