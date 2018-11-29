<?php

namespace App\Http\Controllers\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Nexmo\Laravel\Facade\Nexmo;
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

    public function sendVerify() {
        $code = str_random(8);
        $user = Auth::user()->two_step;
        $user->code = $code;
        $user->save();
        $message = Nexmo::message()->send([
            'to' => Auth::user()->phone,
            'from' => '32474455182',
            'text' => 'Your Project-Together login code is: ' . $code,
        ]);
    }

    public function verify(Request $request) {
        if($request->two_step_code === Auth::user()->two_step->code) {
            $user = Auth::user()->two_step;
            $user->enable_phone = 1;
            $user->phone = 1;
            $user->code = "";
            $user->save();
            return response()->json([
                'two_step_correct' => 1,
            ]);
        } else {
            return response()->json([
                'two_step_correct' => 0,
            ]);
        }
    }
    public function page() {
        Auth::logout();
        return view('front.twostep');

    }

    public function updatePhone() {
        $user = Auth::user()->two_step;
        if($user->phone) {
            $user->phone = 0;
            $user->save();
        } else {
            $user->phone = 1;
            $user->save();
        }
    }
}
