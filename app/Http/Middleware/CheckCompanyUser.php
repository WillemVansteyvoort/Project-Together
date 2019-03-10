<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\User;
class CheckCompanyUser
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

        if (User::where([['username', '=', $request->route('user')], ['company_id', '=', Auth::user()->company_id]])->count() > 0) {
            return $next($request);
        } else {
            return abort(404, 'Unauthorized action.');
        }
    }
}
