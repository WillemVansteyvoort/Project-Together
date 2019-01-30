<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers\Application\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Project;
use App\Tag;
class OverviewController extends Controller
{
    public function getInfo(Request $request) {
        $project = Project::where('url', '=', $request->project)->with('users', 'tags')->first();
        return $project;
    }
}
