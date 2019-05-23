<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers\Application\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Project;
use App\User;
use App\Activity;
use Illuminate\Support\Facades\Auth;

class OverviewController extends Controller
{
    public function getInfo(Request $request) {
        $project = Project::where('url', '=', $request->project)->with('users', 'tags')->first();
        $companyUsers = Auth::user()->company->users;
        return $project;
    }

    public function deleteUser(Request $request) {
        $project = Project::where('url', '=', $request->project)->with('users', 'tags')->first();
        $user = User::findOrFail($request->user);
        $user->projects()->detach($project->id);

        Activity::create([
            'project_id' => $project->id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 32,
            'content' => $user->name . " " . $user->lastname,
        ]);


    }

    public function editUser(Request $request) {
        $project = Project::where('url', '=', $request->project)->with('users', 'tags')->first();
        $user = User::findOrFail($request->user);
        $user->projects()->updateExistingPivot($project->id, ['role' => $request->user_role]);

        Activity::create([
            'project_id' => $project->id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 33,
            'content' => $user->name . " " . $user->lastname,
        ]);

    }
}
