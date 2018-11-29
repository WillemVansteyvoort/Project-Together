<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers\Application;
use App\Company;
use App\User;
use App\Mail\Reset_Password;
use Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Password_reset;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PasswordResetController extends Controller
{
    public function __construct() {
        $this->middleware('guest');

    }    public function index($company) {
        if (Company::where('url', '=', $company)->count() > 0) {
            $companyAll = Company::where('url', '=', $company)->first();
            $companyId = $companyAll->id;
            $companyName = $companyAll->name;
            $companyUrl = $company;
            $companyLogo = $companyAll->logo;
            return view('front.password', compact('companyName', 'companyId', 'companyUrl', 'companyLogo'));
        } else {
            return abort(404, 'Unauthorized action.');
        }
    }


    public function store(Request $request) {
        if(User::where([['company_id', '=', $request->id], ['email', '=', $request->email]])->count() > 0)  {
            $user = User::where([
                ['company_id', '=', $request->id],
                ['email', '=', $request->email]
            ])->first();
            $password_reset = Password_reset::create([
               'email' => strtolower($request->email),
               'company_id' => $request->id,
               'token' => str_random(60),
                'created_at' => now(),
            ]);
            Mail::to($user->email)->send(new Reset_Password($user, $password_reset));
        }
        $request->session()->flash("password_succes", "An email has been sent, if this account exists. Please check your inbox for your reset password link.");
        return back()->withInput();
    }
    public function verifyPage($url, $token) {
        $password_reset = Password_reset::where([
            ['token', $token],
        ])->firstOrFail();

        $time = $password_reset->created_at;
            $companyId = $password_reset->company_id;
            $email = $password_reset->email;
            return view('front.newPassword', compact('companyId', 'email'));
        }

    public function updatePassword(Request $request) {

        if($request->password === $request->password2) {
            $user = User::where([
                ['company_id', '=', $request->id],
                ['email', '=', $request->email]])->first();
            $user->password = Hash::make($request->password);
            $user->save();
            $password_reset = Password_reset::where([
                ['company_id', '=', $request->id],
                ['email', '=', strtolower($request->email)]])->first();
            $password_reset->delete();
            $request->session()->flash("passwordChange_succes", "Your password was succesfully changed. ");
            return view('front.newPassword', compact('companyId', 'email'));
        } else {
            $request->session()->flash("passwordChange_fault", "Passwords don't match");
            return back()->withInput();
        }
    }
}
