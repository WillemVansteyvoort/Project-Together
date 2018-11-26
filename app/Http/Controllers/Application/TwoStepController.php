<?php

namespace App\Http\Controllers\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use App\Events\Notifications;
class TwoStepController extends Controller
{
    public function change(Request $request) {
        $user = Auth::user()->two_step;

        if($user->active) {
            $user->active = 0;
        } else {
            $user->active = 1;
        }
        $user->save();

    }
    public function login(Request $request) {

        $user = Auth::loginUsingId($request->user_id);
        if($request->code === $user->two_step->code) {
           return redirect( "/company");
        } else {
           $user_id = Auth::user()->id;
           $user->two_step->code = "";
           $user->save();
           Auth::logout();
            $request->session()->flash("fault_twofactor", "The code doesn't match, please try again.");
            return view('front.twostep', compact('user_id'));

        }
    }

    public function page() {
        Auth::logout();
        return view('front.twostep');

    }
}
