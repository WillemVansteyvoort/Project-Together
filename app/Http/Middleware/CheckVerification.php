<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Carbon\Carbon;
class CheckVerification
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

        if(Auth::user()->company->created_at < Carbon::yesterday()) {
            if(!Auth::user()->company->user->verified) {
                return redirect( "/no-access");
            }
        }
        return $next($request);
    }
}
