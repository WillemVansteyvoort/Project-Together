<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Company;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

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
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password, 'owner' => 1])) {
            return redirect( Auth::user()->company->url . "/dashboard");
        }
        $request->session()->flash("fault", "The data doesn't match, please try again.");
        return back()->withInput();
    }

}
