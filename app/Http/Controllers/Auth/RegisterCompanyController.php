<?php

namespace App\Http\Controllers\auth;

use Illuminate\Http\Request;
use App\User;
use App\Company;
use App\Notification;
use Validator;
use Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
class RegisterCompanyController extends Controller
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

            return response()->json([
            'emailCheck' => $validateUser,
            'companyCheck' => $validateCompany
        ]);



    }

    public function create(Request $request) {

        $user =  User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'company_id' => 0,
            'owner' => 1,
            'avatar' => 'user.jpg',
            'termsOfService' => 1,
            'privacyPolicy' => 1,
            'function' =>  $request->function,
            'last_activity' => now(),
            'newsletter' => $request->newsletter,
            'hide_data' => $request->hide_data,
            'safety' => $request->safety,

        ]);


        $url = strtolower(str_replace(' ', '', $request->company_name));
        $company = Company::create([
            'url' => $url,
            'user_id' => $user->id,
            'name' => $request->company_name,
            'industry_id' => $request->company_industry,
            'plan' => $request->company_type,

        ]);

        $user->company_id = $company->id;
        $user->save();



        $credentials = $request->only('email', 'password');

        $notification = Notification::create([
            'user_id' => $user->id,
            'title' => 'Activate your account',
            'type' => 'far fa-envelope-open',
            'content' => 'Please activate your account. We send you an email with the instructions.',

        ]);
        if(Auth::attempt($credentials)) {
        }

    }



}
