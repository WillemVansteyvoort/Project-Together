<?php

namespace App\Http\Controllers\Application;
use App\Mail\Welcome;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Carbon\Carbon;
use App\User;
use App\User_verify;
use App\Mail\Registered;
use Illuminate\Support\Facades\Mail;
class VerifyUser extends Controller
{
    public function index($token, $id) {
        $verify = User_verify::where([
            ['token', $token],
            ['user_id', $id]
        ])->firstOrFail();;

        if($verify->created_at->addHour() <= Carbon::now()){
            session()->flash("verify_overdate", "This verification url has been expired. Please login to send a new verification e-mail.");
            if(Auth::check()) {
                return redirect( "/company");
            } else {
                return view('front.verify');

            }
        } else {
            $user = User::where('id', $verify->user_id)->first();
            $user->verified = 1;
            $user->save();
            session()->flash("verify_success", "Your account is succesfully verified.");
            $verify->delete();
            Mail::to($user->email)->send(new Welcome($user));
            if(Auth::check()) {
                return redirect( "/company");
            } else {
                return view('front.verify');

            }
        }
    }

    public function verifyEmail() {
        $verify = User_verify::create([
            'token' => str_random(60),
            'user_id' => Auth::user()->id,
        ]);
        Mail::to(Auth::user()->email)->send(new Registered(Auth::user(), $verify));
        return redirect()->back();
    }
}
