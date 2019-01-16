<?php

namespace App\Http\Controllers\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\City;
use App\Country;
use App\Group;
use App\Two_step;
use App\Notification;
use App\User_right;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
class CreateUserController extends Controller
{
    public function store(Request $request) {

    }

    public function checkEmail(Request $request) {

        $email_check = false;
        if (User::where([['email', '=', $request->user_email], ['company_id', '=', Auth::user()->company_id]])->count() > 0) {
            $email_check = true;
        }

        return response()->json([
            'email_check' => $email_check,
        ]);
    }

    public function createUser(Request $request) {

        //creating user
        $user = User::create([
            'name' => $request->user_name,
            'lastname' => $request->user_lastname,
            'username' => $request->user_username,
            'email' => $request->user_email,
            'admin' => $request->right_admin,
            'password' => Hash::make($request->password_new),
            'avatar' => 'https://project-together.com/images/user.jpg',
            'company_id' => Auth::user()->company->id,
            'termsOfService' => 0,
            'privacyPolicy' => 0,
            'verified' => 1,
            'street' => $request->user_street,
            'phone' => $request->user_phone,
            'hide_data' => $request->user_hideInformation,
            'online' => !$request->user_online
        ]);

        //kijken naar city
        $city = City::where([['name', '=', $request->user_city], ['country_id', '=', $request->user_country_id], ['zipcode', '=', $request->user_zipcode]])->first();

        //checken of stad al bestaat
        if ((!empty($request->user_city)) && (City::where([['name', '=', $request->user_city], ['country_id', '=', $request->user_country_id], ['zipcode', '=', $request->user_zipcode]])->count() > 0)) {
            $user->city_id = $city->id;
            $user->save();
        } else {
            $new_city = City::create([
                'name' => $request->user_city,
                'country_id' => $request->user_country_id,
                'zipcode' => $request->user_zipcode,
            ]);
            $user->city_id = $new_city->id;
            $user->save();
        }

        //setting groups
        foreach ($request->selectedGroups as $name) {
            $group = Group::where([
                ['name', '=',$name],
                ['company_id', '=', Auth::user()->company_id],
            ])->first();

            $user->groups()->attach($group->id);
        }

        //rights
        $rights = User_right::create([
            'user_id' => $user->id,
            'create_members' => $request->right_createMembers,
            'create_groups' => $request->right_createGroups,
            'create_projects' => $request->right_createProject,
            'company_settings' => $request->right_companySettings,
            'upload_avatar' => $request->right_avatar,
            'change_online' => $request->right_online,
        ]);
        //others
        Two_step::create([
            'user_id' => $user->id,
            'active' => $request->user_twostep,
            'email' => 1,
            'phone' => 1,
        ]);

        $notification = Notification::create([
            'user_id' => $user->id,
            'title' => 'Welcome to Project-Together!',
            'type' => 'fas fa-smile',
            'content' => 'Welcome to Project-Together. If you have any questions, be sure to check our documentation..',

        ]);

        return response()->json([
            'isLoading' => false,
        ]);
    }
}
