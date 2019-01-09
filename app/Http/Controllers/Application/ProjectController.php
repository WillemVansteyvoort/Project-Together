<?php

namespace App\Http\Controllers\Application;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index() {

        return view('application.projects');

    }

    public function create(Request $request) {

    }

    public function allUsers() {

    }
}
