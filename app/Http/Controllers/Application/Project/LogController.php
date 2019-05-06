<?php

namespace App\Http\Controllers\Application\Project;

use App\Http\Middleware\Language;
use function GuzzleHttp\describe_type;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Project;
use App\Log;
use Illuminate\Support\Facades\Auth;

class LogController extends Controller
{
    public function getitems(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        return $project->projectLogs;
    }

    public function create(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        $log = Log::create([
           'content' => $request->text,
            'user_id' => Auth::user()->id,
            'project_id' => $project->id,
        ]);

        return $log;
    }

    public function delete(Request $request) {
        Log::destroy($request->log_id);
    }

    public function edit(Request $request) {

    }
}
