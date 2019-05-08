<?php

namespace App\Http\Controllers\Application\Project;

use App\Http\Middleware\Language;
use function GuzzleHttp\describe_type;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Project;
use App\Activity;
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

        Activity::create([
            'project_id' => $project->id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 24,
            'content' => 0,
        ]);

        return $log;
    }

    public function delete(Request $request) {
        $log = Log::findOrFail($request->log_id);

        Activity::create([
            'project_id' => $log->project_id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 25,
            'content' => 0,
        ]);

        Log::destroy($request->log_id);
    }

    public function edit(Request $request) {

    }
}
