<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
class OnlyOwner
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

        if(Auth::check() && Auth::user()->owner) {
            return $next($request);
        } else {
            return abort(403, 'Unauthorized action.');
        }


    }
}
