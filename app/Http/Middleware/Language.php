<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
class Language

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
        if(!Session::has('lang')){
            $locale = substr($request->server('HTTP_ACCEPT_LANGUAGE'), 0, 2);
            session()->put('lang', $locale);
        } else {
            App::setLocale(session()->get('lang'));
        }

        return $next($request);
    }

}
