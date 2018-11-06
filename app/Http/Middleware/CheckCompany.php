<?php

namespace App\Http\Middleware;
use Closure;
use App\User;
use Auth;
use App\Company;
class CheckCompany
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


        $user_company = Auth::user()->company->url;
        $company = $request->route('company');
        if($user_company == $company) {
            return $next($request);
        } else {
            return abort(403, 'Unauthorized action.');
        }


    }


}
