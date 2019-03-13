<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers\Application\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Project;
use App\User;
class OverviewController extends Controller
{
    public function getInfo(Request $request) {
        $project = Project::where('url', '=', $request->project)->with('users', 'tags')->first();
        return $project;
    }

    public function deleteUser(Request $request) {
        $project = Project::where('url', '=', $request->project)->with('users', 'tags')->first();
        $user = User::findOrFail($request->user);
        $user->projects()->detach($project->id);
    }

    public function editUser(Request $request) {
        $project = Project::where('url', '=', $request->project)->with('users', 'tags')->first();
        $user = User::findOrFail($request->user);
        $user->projects()->updateExistingPivot($project->id, ['role' => $request->user_role]);
    }
}
