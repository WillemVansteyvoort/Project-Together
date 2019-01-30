<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use Auth;
use App\Company;
use App\Project;
class CheckProject
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $project = Project::where('url', '=', $request->route('project'))->firstOrFail();
        if(Auth::user()->projects->contains($project->id)) {
            return $next($request);
        } else {
            return abort(403, 'Unauthorized action.');
        }

    }
}
