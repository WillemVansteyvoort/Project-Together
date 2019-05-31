<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\Mail\Two_step;
use Illuminate\Http\Request;
use App\User;
use App\Company;
use Illuminate\Support\Facades\Hash;
use Socialite;
use Illuminate\Support\Facades\Auth;
use Nexmo\Laravel\Facade\Nexmo;
use Illuminate\Support\Facades\Mail;

class LoginController extends Controller
{

    public function __construct() {
        $this->middleware('guest');
    }

    public function index() {
        return view('front.login');
    }


    public function store(Request $request) {


        $user = User::where([
            ['email', '=', $request->email],
            ['owner', '=', 1],])->first();


        $credentials = $request->only('email', 'password');
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password, 'owner' => 1], $request->remember)) {
            if(Auth::user()->two_step->active) {
                //checken of two-step nodig is ...
                $code = str_random(8);
                $user = Auth::user()->two_step;
                $user->code = $code;
                $user->save();


                $user_id = Auth::user()->id;

                if(Auth::user()->two_step->phone) {
                    $message = Nexmo::message()->send([
                       'to' => Auth::user()->phone,
                       'from' => '32474455182',
                       'text' => 'Your Project-Together login code is: ' . $code,
                   ]);
                }

                if(Auth::user()->two_step->email) {
                    $user = User::where('id', Auth::user()->id)->first();
                    Mail::to(Auth::user()->email)->send(new Two_step($user));
                }

                Auth::logout();
                return view('front.twostep', compact('user_id'));
            } else {
                return redirect( "/company");
            }
        }
        $request->session()->flash("fault", "The data doesn't match, please try again.");
        return back()->withInput();
    }


    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider)
    {
        echo "jo";
        $user = Socialite::driver($provider)->user();
        echo $user->email;
    }

    public function facebook($user, $provider) {
        $authUser = User::where('provider_id', $user->id)->first();
    }
    public function login(Request $request) {

        if($request->code === Auth::user()->two_step->code) {
           Auth::loginUsingId($request->user_id);
         return redirect( "/company");
       } else {
            $user_id = Auth::user()->id;
           return view('front.twostep', compact('user_id'));
        }
    }
}
