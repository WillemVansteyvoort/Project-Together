<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Others\SlugifyController;
use App\Mail\Registered;
use Illuminate\Http\Request;
use App\User;
use App\Group;
use App\Company;
use App\Notification;
use App\User_verify;
use App\Two_step;
use Illuminate\Support\Facades\Auth;
use App\User_right;
use App\User_email;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class RegisterCompanyController extends SlugifyController
{
    public function index() {
        return view('front.register');
    }

    public function check(Request $request) {


        $validateUser = true;
        if (User::where([['email', '=', $request->email], ['owner', '=', 1]])->count() > 0) {
            $validateUser = false;
        }

        $validateCompany = true;
        if (Company::where([['name', '=', $request->company_name]])->count() > 0) {
            $validateCompany = false;
        }
        if(Company::where([['url', '=', strtolower(str_replace('', '', $request->company_name))]])->count() > 0) {
            $validateCompany = false;
        }

            return response()->json([
            'emailCheck' => $validateUser,
            'companyCheck' => $validateCompany
        ]);
    }

    public function create(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'username' => $request->name . $request->lastname[0],
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'company_id' => 0,
            'owner' => 1,
            'admin' => 1,
            'avatar' => $request->user_avatar,
            'termsOfService' => 1,
            'privacyPolicy' => 1,
            'function' => $request->function,
            'last_activity' => now(),
            'newsletter' => $request->newsletter,
            'hide_data' => $request->hide_data,
            'provider' => $request->provider,
            'provider_id' => $request->provider_id,
        ]);

        //rights
        $rights = User_right::create([
            'user_id' => $user->id,
            'create_members' => 1,
            'create_groups' => 1,
            'create_projects' => 1,
            'company_settings' => 1,
            'upload_avatar' => 1,
            'change_online' => 1,
        ]);
        Two_step::create([
            'user_id' => $user->id,
            'active' => 0,
            'email' => 1,
            'phone' => 0,
        ]);
        User_email::create([
           'user_id' => $user->id,
        ]);
        $url = strtolower(str_replace(' ', '', $request->company_name));
        $slugify = $this->slugify($url, false);
        $this->slugify($user, false);
        $company = Company::create([
            'url' => $slugify,
            'user_id' => $user->id,
            'name' => $request->company_name,
            'industry_id' => $request->company_industry,
            'plan_id' => $request->company_type,

        ]);

        $user->company_id = $company->id;
        $user->save();

        $credentials = $request->only('email', 'password');
        Notification::create([
            'user_id' => $user->id,
            'title' => 'Welcome to Project-Together!',
            'type' => 'fas fa-smile',
            'content' => 'Welcome to Project-Together. If you have any questions, be sure to check our documentation.',

        ]);
        $notification = Notification::create([
            'user_id' => $user->id,
            'title' => 'Activate your account',
            'type' => 'far fa-envelope-open',
            'content' => 'Please activate your account. We send you an email with the instructions.',

        ]);
        //first group
        $group = Group::create([
            'name' => 'Administrator',
            'company_id' => $company->id,
            'user_id' => $user->id,
        ]);
        $user->groups()->save($group);

        //send mail
        $verify = User_verify::create([
            'token' => str_random(60),
            'user_id' => $user->id,
        ]);
        Auth::loginUsingId($user->id, true);
        Mail::to($user->email)->send(new Registered($user, $verify));
    }

}
